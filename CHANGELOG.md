# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- ## [Unreleased] -->
## [1.1.1] - 2023-05-14
### Fixed
- Express Service: Constructor modified to require `port` and `host` parameters to start the express app in the `onMount()` lifecycle.

## [1.1.0] - 2023-05-03
### Added
- Logger Service: Service to handle log events that can print on the console. In the future it will print log events on files.
- Express Service: Service to handle and create the HTTP requests.

## [1.0.0] - 2023-04-02
### Added
- TyAPI Error: Class for error context error that can handle a response as a API Backend.
- TyAPI Context: Base element for the Core Library. It handles the life cycle of services.
- TyAPI Service: Handle the app services like connections to databases or bring several handlers available in the context core.