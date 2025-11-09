# Installing the `psql` Client

The project occasionally relies on the PostgreSQL command line tools (e.g. when
running integration tests or verifying external data sources). Follow the steps
below to install the `psql` client on Ubuntu-based systems.

1. Ensure that APT is allowed to talk to Ubuntu mirrors over HTTPS. On some
   locked-down environments you may need to update `/etc/apt/sources.list.d/ubuntu.sources`
   so that the `URIs` entries start with `https://` instead of `http://`.
2. Refresh the package indices:

   ```bash
   sudo apt-get update
   ```

3. Install the PostgreSQL client binaries:

   ```bash
   sudo apt-get install -y postgresql-client
   ```

If your network egress policy blocks access to Ubuntu or PostgreSQL mirrors you
will need to work with your infrastructure team to allow HTTPS traffic to those
hosts (for example `archive.ubuntu.com`, `security.ubuntu.com`, and
`apt.postgresql.org`). Without that access, `apt-get` will report HTTP 403
errors and the installation will fail.
