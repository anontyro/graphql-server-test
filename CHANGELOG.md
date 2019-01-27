# ChangeLog

Changes will be documented here generally around release items using symantic versioning

## Unreleased

## Version 1.0.0

- Update HotItems to map correctly
- HotItems now has a new type
  - Yearpublished is nullable
- Added in HotItem Mock
  - Only boardgame
- Update API_DATA to display actual host root
- Update API_DATA with additional information

## Version 1.0.0-rc-1

- Added in CORS allowance for all routes
- Added in root data page

## Version 1.0.0-rc

- Main BGG routes are handled:
  - Boardgame Search
  - Boardgame Query
  - Collection Query
  - User Query
  - Hot Item Query
- Util classes are correctly tested as required
- All tests are passing
- DockerFile has been created and this can be dockerized
