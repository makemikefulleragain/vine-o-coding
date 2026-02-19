$sites = @(
  @{name="kamunity.org";        url="https://kamunity.org"},
  @{name="kamunity.ai";         url="https://kamunity.ai"},
  @{name="wedding";             url="https://fariha-mike-wedding-2026.netlify.app"},
  @{name="sovereignty-audit";   url="https://kamunity-audit.netlify.app"},
  @{name="ai-readiness";        url="https://kamunity-ai-readiness.netlify.app"},
  @{name="vine-o-coding";       url="https://vine-o-coding.netlify.app"},
  @{name="factoryk1";           url="https://factoryk1.netlify.app"},
  @{name="nonnas-knitting";     url="https://nonnas-knitting-circle.netlify.app"},
  @{name="grants-hub";          url="https://grants-hub.netlify.app"},
  @{name="greenfield-plan";     url="https://adorable-dango-3479db.netlify.app"},
  @{name="system-map";          url="https://subtle-starship-d0bdac.netlify.app"},
  @{name="needs-journey";       url="https://starlit-unicorn-6440fb.netlify.app"},
  @{name="mycelium";            url="https://candid-donut-4ec289.netlify.app"},
  @{name="kamunitydemo.org";    url="https://kamunitydemo.org"}
)

$pass = 0; $fail = 0; $results = @()

foreach ($s in $sites) {
  try {
    $r = Invoke-WebRequest -Uri $s.url -TimeoutSec 10 -UseBasicParsing -EA Stop
    $results += "OK   $($r.StatusCode)  $($s.name)"
    $pass++
  } catch {
    $c = $_.Exception.Response.StatusCode.value__
    if ($c) { $results += "WARN $c   $($s.name)  ($($s.url))"; $fail++ }
    else     { $results += "FAIL ---  $($s.name)  ($($s.url))"; $fail++ }
  }
}

$results
Write-Host ""
Write-Host "$pass/$($sites.Count) sites healthy. $fail failures."
