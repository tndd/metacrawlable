# MetaCrawlable Docker Management
.PHONY: help build dev prod test clean logs

# Default target
help: ## Show this help message
	@echo "MetaCrawlable Docker Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build all Docker images
	docker-compose build

dev: ## Start development environment with hot reload
	docker-compose up metacrawlable-dev

prod: ## Start production environment
	docker-compose up -d metacrawlable-prod
	@echo "Production server running at http://localhost:3001"
	@echo "Health check: curl http://localhost:3001/static"

test: ## Run all tests against production environment
	docker-compose up -d metacrawlable-prod
	@echo "Waiting for production server to be ready..."
	@sleep 10
	docker-compose run --rm test-runner

test-static: ## Run StaticLand tests only
	docker-compose up -d metacrawlable-prod
	@sleep 5
	docker-compose run --rm test-static

test-dynamic: ## Run DynamicMaze tests only
	docker-compose up -d metacrawlable-prod
	@sleep 5
	docker-compose run --rm test-dynamic

test-client: ## Run ClientShadow tests only
	docker-compose up -d metacrawlable-prod
	@sleep 5
	docker-compose run --rm test-client

test-antibot: ## Run BotWarden tests only
	docker-compose up -d metacrawlable-prod
	@sleep 5
	docker-compose run --rm test-antibot

logs: ## Show logs from all services
	docker-compose logs -f

logs-dev: ## Show development server logs
	docker-compose logs -f metacrawlable-dev

logs-prod: ## Show production server logs
	docker-compose logs -f metacrawlable-prod

stop: ## Stop all services
	docker-compose down

clean: ## Stop services and remove containers, networks, and volumes
	docker-compose down -v --remove-orphans
	docker system prune -f

restart-dev: ## Restart development environment
	docker-compose restart metacrawlable-dev

restart-prod: ## Restart production environment
	docker-compose restart metacrawlable-prod

shell-dev: ## Access development container shell
	docker-compose exec metacrawlable-dev sh

shell-prod: ## Access production container shell
	docker-compose exec metacrawlable-prod sh

health: ## Check health of all services
	@echo "Checking service health..."
	@docker-compose ps
	@echo ""
	@echo "Testing endpoints:"
	@curl -s -o /dev/null -w "StaticLand:    %{http_code}\n" http://localhost:3001/static || echo "StaticLand:    FAILED"
	@curl -s -o /dev/null -w "DynamicMaze:   %{http_code}\n" http://localhost:3001/dynamic || echo "DynamicMaze:   FAILED"
	@curl -s -o /dev/null -w "ClientShadow:  %{http_code}\n" http://localhost:3001/client-only || echo "ClientShadow:  FAILED"
	@curl -s -o /dev/null -w "BotWarden:     %{http_code}\n" http://localhost:3001/anti-bot || echo "BotWarden:     FAILED"

demo: ## Start all services and run a quick demo
	@echo "🚀 Starting MetaCrawlable demo..."
	docker-compose up -d metacrawlable-prod
	@echo "⏳ Waiting for services to be ready..."
	@sleep 15
	@echo "✅ Testing all 4 sites:"
	@make health
	@echo ""
	@echo "🎯 Demo URLs:"
	@echo "  StaticLand:   http://localhost:3001/static"
	@echo "  DynamicMaze:  http://localhost:3001/dynamic"
	@echo "  ClientShadow: http://localhost:3001/client-only"
	@echo "  BotWarden:    http://localhost:3001/anti-bot"
	@echo ""
	@echo "🤖 Testing bot detection:"
	@curl -s -H "User-Agent: Googlebot/2.1" -w "Bot Response: %{http_code}\n" http://localhost:3001/anti-bot || echo "Bot test failed"