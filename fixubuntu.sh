#!/bin/bash

# Figure out the version of Ubuntu that you're running
V=`/usr/bin/lsb_release -rs`

# The privacy problems started with 12.10, so earlier versions should do nothing
if [ $V \< 12.10 ]; then
  echo "Good news! Your version of Ubuntu doesn't invade your privacy."
else
  # Turn off "Remote Search", so search terms in Dash don't get sent to the internet
  gsettings set com.canonical.Unity.Lenses remote-content-search none

  # If you're using earlier than 13.10, uninstall unity-lens-shopping
  if [ $V \< 13.10 ]; then
    sudo apt-get remove -y unity-lens-shopping

  # If you're using a later version, disable remote scopes
  else
    gsettings set com.canonical.Unity.Lenses disabled-scopes \
      "['more_suggestions-amazon.scope', 'more_suggestions-u1ms.scope', 
      'more_suggestions-populartracks.scope', 'music-musicstore.scope', 
      'more_suggestions-ebay.scope', 'more_suggestions-ubuntushop.scope', 
      'more_suggestions-skimlinks.scope']"
  fi;

  # Block connections to Ubuntu's ad server, just in case
  if ! grep -q productsearch.ubuntu.com /etc/hosts; then 
    echo -e "\n127.0.0.1 productsearch.ubuntu.com" | sudo tee -a /etc/hosts >/dev/null
  fi

  echo "All done. Enjoy your privacy."
fi

