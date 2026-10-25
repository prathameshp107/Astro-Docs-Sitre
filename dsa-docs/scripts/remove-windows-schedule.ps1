# Unregister Windows Scheduled Tasks for Instagram 3x Daily Reel Uploads

$taskNames = @(
  "InstagramReel_Morning_9AM",
  "InstagramReel_Noon_12PM",
  "InstagramReel_Evening_5PM",
  "InstagramReel_Evening_6PM",
  "InstagramReel_Night_8PM"
)

foreach ($name in $taskNames) {
  Unregister-ScheduledTask -TaskName $name -Confirm:$false -ErrorAction SilentlyContinue
  Write-Host "Unregistered: $name"
}

Write-Host "`nAll Instagram Windows scheduled tasks have been removed."
