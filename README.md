# The "Applications" tool for Cockpit

This is a preview of the "Applications" tool for Cockpit, in
pre-compiled form for easy consumption.

Development happens here: https://github.com/cockpit-project/cockpit/pull/7076

## Getting started

Simply clone this repository into ~/.local/share/cockpit:

    $ mkdir -p ~/.local/share/cockpit
    $ cd ~/.local/share/cockpit
    $ git clone https://github.com/mvollmer/cockpit-apps-bin.git

Then re-login to Cockpit.  You should now see a new "Applications"
entry in the shell navigation menu.

If you are on Fedora, you can use a COPR with some demo packages to
get something to play with:

    https://copr.fedorainfracloud.org/coprs/mvo/cockpit-app-freeipa/

    # dnf copr enable mvo/cockpit-app-freeipa
    # dnf install appstream-data-mvo
