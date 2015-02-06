<?php
// File to expose API
header('Content-Type: application/json');

$local = 'status.json';
$remote = 'http://kom.aau.dk/~jopete12/erkennethder/status.json';
$errorMsg = '{"status": "API FAIL: Check Arduino connection...\n"}';

function saveStatus($remoteFile, $localFile) {
    $data = file_get_contents($remoteFile);
    $handle = fopen($localFile, 'w');
    fwrite($handle, $data);
    fclose($handle);
}

if (!file_exists($local)) {
    // Try to download the file
    saveStatus($remote, $local);
} else {
    // Check if older than 30 s
    $then = filemtime($local);
    $now = round(microtime(true));
    if (($now - $then) > 30) {
        unlink($local);
        saveStatus($remote, $local);
    } 
}

$output = file_get_contents($local);
echo $output;