import { useState, useEffect, useCallback } from 'react';
import { saveGuideProgress, loadGuideProgress, exportGuideAsCSV } from '../utils/auditStorage';

// Normalise item: string → object for backwards compat
function normaliseItem(item) {
  if (typeof item === 'string') return { label: item, inputType: 'text' };
  return item;
}

// Status options for each item — 3 radio-style buttons
const STATUS_OPTIONS = [
  { value: 'done', label: 'Done', bg: 'bg-green-500', ring: 'ring-green-300', text: 'text-green-700' },
  { value: 'in-progress', label: 'In Progress', bg: 'bg-amber-400', ring: 'ring-amber-200', text: 'text-amber-700' },
  { value: 'not-started', label: 'Not Started', bg: 'bg-red-400', ring: 'ring-red-200', text: 'text-red-600' },
];

function StatusRadios({ status, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {STATUS_OPTIONS.map(opt => {
        const active = status === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(active ? '' : opt.value)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer border ${
              active
                ? `${opt.bg} text-white border-transparent ring-2 ${opt.ring}`
                : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
            }`}
            title={opt.label}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-white' : opt.bg}`} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ItemInput({ item, value, onChange }) {
  const norm = normaliseItem(item);
  const type = norm.inputType || 'text';

  if (type === 'none' || norm.offlineOnly) return null;

  if (type === 'dropdown') {
    return (
      <select
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ku-teal focus:border-transparent bg-gray-50 cursor-pointer"
      >
        <option value="">{norm.placeholder || 'Select...'}</option>
        {(norm.options || []).map((opt, i) => (
          <option key={i} value={typeof opt === 'string' ? opt : opt.value}>
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={norm.placeholder || 'Enter details here...'}
        rows={3}
        className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ku-teal focus:border-transparent bg-gray-50 placeholder:text-gray-300 resize-y"
      />
    );
  }

  if (type === 'number') {
    return (
      <input
        type="text"
        inputMode="decimal"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={norm.placeholder || 'Enter amount...'}
        className="w-full max-w-[200px] px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ku-teal focus:border-transparent bg-gray-50 placeholder:text-gray-300"
      />
    );
  }

  // Default: text
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={norm.placeholder || 'Add your data or notes...'}
      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ku-teal focus:border-transparent bg-gray-50 placeholder:text-gray-300"
    />
  );
}

export default function FillableChecklist({ guideId, guideTitle, sections }) {
  const [data, setData] = useState(() => {
    const saved = loadGuideProgress(guideId);
    const blank = { checked: false, notes: '', value: '', status: '' };
    const merged = { sections: {} };
    for (const section of sections) {
      const savedItems = saved?.sections?.[section.id]?.items;
      merged.sections[section.id] = {
        items: section.items.map((_, i) => {
          const s = savedItems?.[i];
          return s ? { ...blank, ...s } : { ...blank };
        }),
      };
    }
    return merged;
  });

  const save = useCallback(() => {
    saveGuideProgress(guideId, data);
  }, [guideId, data]);

  useEffect(() => {
    const timer = setTimeout(save, 300);
    return () => clearTimeout(timer);
  }, [save]);

  function ensureItem(next, sectionId, itemIndex) {
    if (!next.sections[sectionId]) next.sections[sectionId] = { items: [] };
    if (!next.sections[sectionId].items[itemIndex]) {
      next.sections[sectionId].items[itemIndex] = { checked: false, notes: '', value: '', status: '' };
    }
  }

  function setStatus(sectionId, itemIndex, newStatus) {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      ensureItem(next, sectionId, itemIndex);
      const item = next.sections[sectionId].items[itemIndex];
      item.status = newStatus;
      item.checked = newStatus === 'done';
      return next;
    });
  }

  function updateField(sectionId, itemIndex, field, val) {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      ensureItem(next, sectionId, itemIndex);
      next.sections[sectionId].items[itemIndex][field] = val;
      return next;
    });
  }

  // Stats
  let totalItems = 0;
  let doneItems = 0;
  let inProgressItems = 0;
  let notStartedItems = 0;
  for (const section of sections) {
    for (let i = 0; i < section.items.length; i++) {
      totalItems++;
      const d = data.sections?.[section.id]?.items?.[i];
      const st = d?.status || '';
      if (st === 'done' || d?.checked) doneItems++;
      else if (st === 'in-progress') inProgressItems++;
      else if (st === 'not-started') notStartedItems++;
    }
  }
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  function handleDownload() {
    exportGuideAsCSV(guideId, guideTitle, sections);
  }

  return (
    <div>
      {/* Progress + Download bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 print:hidden">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-1 bg-gray-100 rounded-full h-2.5 max-w-[200px]">
              <div
                className="bg-ku-teal h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 font-medium shrink-0">
              {doneItems}/{totalItems} ({pct}%)
            </span>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CSV
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Done ({doneItems})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> In Progress ({inProgressItems})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> Not Started ({notStartedItems})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span> Offline</span>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.id} className={`rounded-xl p-6 mb-6 ${section.className || 'bg-white border border-gray-200'}`}>
          <h2 className={`font-bold text-lg mb-1 ${section.titleClass || 'text-ku-navy'}`}>{section.title}</h2>
          {section.subtitle && <p className={`text-sm mb-4 ${section.subtitleClass || 'text-gray-500'}`}>{section.subtitle}</p>}
          {section.beforeItems}
          <ul className="space-y-5">
            {section.items.map((rawItem, i) => {
              const item = normaliseItem(rawItem);
              const itemData = data.sections?.[section.id]?.items?.[i] || { checked: false, notes: '', value: '', status: '' };
              const isOffline = item.offlineOnly;
              const isDone = itemData.status === 'done' || itemData.checked;

              return (
                <li key={i} className={`rounded-lg p-3 transition-colors ${isDone ? 'bg-green-50/50' : itemData.status === 'in-progress' ? 'bg-amber-50/30' : isOffline ? 'bg-gray-50' : 'bg-white hover:bg-gray-50/50'}`}>
                  <div className="flex-1 min-w-0">
                    {/* Label + status row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-sm leading-relaxed ${isDone ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                      {isOffline && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] text-gray-500 font-medium shrink-0" title={item.offlineReason || 'Complete in the downloaded template'}>
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          Offline
                        </span>
                      )}
                    </div>

                    {/* Status radio buttons */}
                    {!isOffline && (
                      <div className="mb-2">
                        <StatusRadios
                          status={itemData.status || (itemData.checked ? 'done' : '')}
                          onChange={val => setStatus(section.id, i, val)}
                        />
                      </div>
                    )}

                      {/* Offline reason */}
                      {isOffline && item.offlineReason && (
                        <p className="text-[10px] text-gray-400 italic mb-1">{item.offlineReason}</p>
                      )}

                      {/* Data input area — always visible for non-offline items */}
                      {!isOffline && (
                        <div className="space-y-1.5">
                          <ItemInput
                            item={item}
                            value={itemData.value}
                            onChange={val => updateField(section.id, i, 'value', val)}
                          />
                          {/* Notes field — always visible when there's a value input */}
                          {item.inputType !== 'none' && (
                            <input
                              type="text"
                              value={itemData.notes || ''}
                              onChange={e => updateField(section.id, i, 'notes', e.target.value)}
                              placeholder="Notes / follow-up needed..."
                              className="w-full px-2.5 py-1 text-[11px] border border-dashed border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ku-teal focus:border-transparent bg-transparent placeholder:text-gray-300 text-gray-500"
                            />
                          )}
                        </div>
                      )}

                    {/* Offline items get a simpler notes-only field */}
                    {isOffline && (
                      <input
                        type="text"
                        value={itemData.notes || ''}
                        onChange={e => updateField(section.id, i, 'notes', e.target.value)}
                        placeholder="Notes..."
                        className="w-full px-2.5 py-1 text-[11px] border border-dashed border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ku-teal focus:border-transparent bg-transparent placeholder:text-gray-300 text-gray-500 mt-1"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {/* Saved notice */}
      <p className="text-xs text-gray-400 text-center mb-6 print:hidden">
        Your progress is saved on this device only. Download the CSV to keep a copy.
        Items marked <span className="font-medium text-gray-500">Offline</span> are best completed in the downloaded Word template.
      </p>
    </div>
  );
}
