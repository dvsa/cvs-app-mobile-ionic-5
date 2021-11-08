#!/bin/bash

vulnerability_count=$(npm audit --production --parseable | grep -E '(high|critical)' -c);

if [ "$vulnerability_count" -ne 0 ]; then
    echo "Vulnerabilities detected: ${vulnerability_count}"
    exit 1;
else
    echo "No vulnerabilities detected"
fi
