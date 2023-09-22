sleep 10s
echo "<< Running Database Initialization >>"
/opt/mssql-tools/bin/sqlcmd -S db -U SA -P "Tywoon123" -i db-init.sql
