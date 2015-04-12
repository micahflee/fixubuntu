#!/bin/bash

GS="/usr/bin/gsettings"
CCUL="com.canonical.Unity.lenses"

# Figure out the version of Ubuntu that you're running
V=$(/usr/bin/lsb_release -rs)
# The privacy problems started with v12.10, so earlier versions should do nothing

# 14.04.1 and 14.04.02 aren't numbers, chop them to 14.04
V=$(echo "$V" | cut -d. -f1-2)

# Minimum version check
MIN=`echo $V'>'12.10 | bc -l`

# Maximum version check
FIXED_VER=15.04
MAX=`echo $FIXED_VER'>'$V | bc -l`

if [[ $MIN -eq 0 || $MAX -eq 0 ]]; then 
  echo "Good news! This version of Ubuntu is not known to invade your privacy."
  exit 0    # The script should exit if Ubuntu version is outside of range
fi

# Check if Canonical schema is present. Take first match, ignoring case.
SCHEMA="$($GS list-schemas | grep -i $CCUL | head -1)"
if [[ -z "$SCHEMA" ]]
  then
  printf "Error: could not find Canonical schema %s.\n" "$CCUL" 1>&2
  exit 1
else
  CCUL="$SCHEMA"
fi

# Turn off "Remote Search", so search terms in Dash aren't sent to the internet
$GS set "$CCUL" remote-content-search none

# If you're using a version earlier than v13.10, uninstall unity-lens-shopping
if [[ $V < 13.10 ]]; then
  sudo apt-get remove -y unity-lens-shopping

# If you're using a later version, disable remote scopes
else
  $GS set "$CCUL" disabled-scopes \
    "['more_suggestions-amazon.scope', 'more_suggestions-u1ms.scope',
    'more_suggestions-populartracks.scope', 'music-musicstore.scope',
    'more_suggestions-ebay.scope', 'more_suggestions-ubuntushop.scope',
    'more_suggestions-skimlinks.scope']"
fi;

# Block connections to Ubuntu's ad server, just in case
if ! grep -q "127.0.0.1 productsearch.ubuntu.com" /etc/hosts; then
  echo -e "\n127.0.0.1 productsearch.ubuntu.com" | sudo tee -a /etc/hosts >/dev/null
fi
# Editing /etc/hosts is OK, but adding an iptables rule seems to be
# a more elegant solution
sudo iptables -A OUTPUT -d 91.189.92.11 -j REJECT

echo "All done. Enjoy your privacy."
