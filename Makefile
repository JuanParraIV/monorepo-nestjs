# Powerful Makefile for Nx + Rspack + NestJS monorepo

# Variables
NX=nx
BUN=bun
DOCKER=docker

# Default target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  install         Install all dependencies (bun)"
	@echo "  clean           Remove dist and node_modules"
	@echo "  lint            Lint all projects"
	@echo "  test            Run all tests"
	@echo "  test-affected   Run tests only for affected projects"
	@echo "  build           Build all projects"
	@echo "  build-affected  Build only affected projects"
	@echo "  serve-api-doc   Serve nest-api-doc app"
	@echo "  serve-rspack    Serve nest-rspack app"
	@echo "  docker-api-doc  Build Docker image for nest-api-doc"
	@echo "  docker-rspack   Build Docker image for nest-rspack"
	@echo "  format          Format all code with Prettier"
	@echo "  upgrade         Upgrade all dependencies (bun)"
	@echo "  ci              Run lint, test, and build (for CI/CD)"

install:
	$(BUN) install

clean:
	rm -rf node_modules dist

lint:
	$(NX) lint

test:
	$(NX) test

test-affected:
	$(NX) affected:test --base=origin/main

build:
	$(NX) build

build-affected:
	$(NX) affected:build --base=origin/main

serve-api-doc:
	$(NX) serve nest-api-doc

serve-rspack:
	$(NX) serve nest-rspack

docker-api-doc:
	$(DOCKER) build -t nest-api-doc:latest ./apps/nest-api-doc

docker-rspack:
	$(DOCKER) build -t nest-rspack:latest ./apps/nest-rspack

format:
	$(BUN) run prettier --write .

upgrade:
	$(BUN) upgrade

ci: lint test build
