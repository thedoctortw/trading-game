# trading-game

missing parts due to time constraint:
- doesn't update portfolio based on bought or sold shares
- Doesn't support cascade deletion. You need to delete the db tables in a specific order or it will raise "violates foreign key constraint" error. I found the root cause of the error. However didn't want to spend time to apply as I am already late.
- jsDocs
- BulkCreating trades logs (you can create them manually via postman Create Trade endpoint)
