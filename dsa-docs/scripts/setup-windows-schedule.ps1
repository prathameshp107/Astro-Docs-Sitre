# Register Windows Scheduled Tasks for Instagram 4x Daily Reel Uploads
# Slots: 9:00 AM, 12:00 PM, 5:00 PM, 8:00 PM

$workspace = "d:\Astro-Docs-Sitre\dsa-docs"
$nodePath = (Get-Command node).Source
$scriptPath = "$workspace\scripts\bulk-uploader.mjs"

Write-Host "====================================================="
Write-Host "  Registering Instagram 4x Daily Tasks in Windows"
Write-Host "====================================================="
Write-Host "Node executable : $nodePath"
Write-Host "Script file     : $scriptPath"
Write-Host "Target slots    : 9:00 AM, 12:00 PM, 5:00 PM, 8:00 PM"
Write-Host ""

$slots = @(
  @{ Name = "InstagramReel_Morning_9AM"; Time = "09:00" },
  @{ Name = "InstagramReel_Noon_12PM";   Time = "12:00" },
  @{ Name = "InstagramReel_Evening_5PM"; Time = "17:00" },
  @{ Name = "InstagramReel_Night_8PM";   Time = "20:00" }
)

foreach ($slot in $slots) {
  $taskName = $slot.Name
  $time = $slot.Time

  $action = New-ScheduledTaskAction -Execute $nodePath -Argument "`"$scriptPath`" --platform=instagram --limit=1" -WorkingDirectory $workspace
  $trigger = New-ScheduledTaskTrigger -Daily -At $time

  Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Description "Upload next DSA Reel to Instagram at $time" -Force | Out-Null
  Write-Host "✓ Registered Task: $taskName (Daily at $time)"
}

Write-Host "`nTasks successfully registered! Windows will now automatically post 1 reel at 9am, 12pm, and 6pm."
Write-Host "To remove these tasks later, run: .\scripts\remove-windows-schedule.ps1`n"
