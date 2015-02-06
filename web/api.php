<?php
// File to expose API
header('Content-Type: application/json');

$local = 'status.json';
$remote = 'http://172.26.13.44/status.json';
$errorMsg = '{"status": "API FAIL: Check Arduino connection...\n"}';

if (!file_exists($local)) {
    // Try to copy the file
    if (!copy($remote, $local)) {
        echo $errorMsg;
    }
} else {
    // Check if older than 30 s
    $then = filemtime($local);
    $now = round(microtime(true));
    if (($now - $then) > 30) {
        unlink($local);
        if (!copy($remote, $local)) {
            echo $errorMsg;
        }
    } 
}

$output = file_get_contents($local);
echo $output;