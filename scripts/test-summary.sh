#!/bin/bash

# MetaCrawlable テスト実行サマリー
# 全4サイトのDockerテストを順次実行し、結果をまとめる

echo "🚀 MetaCrawlable Docker Test Summary"
echo "===================================="
echo

# ヘルスチェック確認
echo "📊 Health Check Status:"
if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
  echo "✅ Application is healthy"
  curl -s http://localhost:3000/api/health | jq -r '.sites[] | "  - \(.site): \(.status) (\(.responseTime)ms)"'
else
  echo "❌ Application is not responding"
  echo "Please run: docker-compose up -d app"
  exit 1
fi
echo

# 各サイトのテスト実行
total_tests=0
total_time=0

echo "🧪 Running Docker Tests:"
echo

# StaticLand
echo "Testing StaticLand (test:docker:static)..."
start_time=$(date +%s)
if npm run test:docker:static > test_output.tmp 2>&1; then
  end_time=$(date +%s)
  duration=$((end_time - start_time))
  tests_passed=$(grep -o "[0-9]\+ passed" test_output.tmp | head -1 | grep -o "[0-9]\+")
  time_taken=$(grep -o "([0-9.]\+s)" test_output.tmp | head -1 | tr -d '()')
  echo "  ✅ $tests_passed tests passed in $time_taken (Docker: ${duration}s)"
  total_tests=$((total_tests + tests_passed))
  total_time=$((total_time + duration))
else
  echo "  ❌ Failed"
fi
rm -f test_output.tmp
echo

# DynamicMaze  
echo "Testing DynamicMaze (test:docker:dynamic)..."
start_time=$(date +%s)
if npm run test:docker:dynamic > test_output.tmp 2>&1; then
  end_time=$(date +%s)
  duration=$((end_time - start_time))
  tests_passed=$(grep -o "[0-9]\+ passed" test_output.tmp | head -1 | grep -o "[0-9]\+")
  time_taken=$(grep -o "([0-9.]\+s)" test_output.tmp | head -1 | tr -d '()')
  echo "  ✅ $tests_passed tests passed in $time_taken (Docker: ${duration}s)"
  total_tests=$((total_tests + tests_passed))
  total_time=$((total_time + duration))
else
  echo "  ❌ Failed"
fi
rm -f test_output.tmp
echo

# ClientShadow
echo "Testing ClientShadow (test:docker:client)..."
start_time=$(date +%s)
if npm run test:docker:client > test_output.tmp 2>&1; then
  end_time=$(date +%s)
  duration=$((end_time - start_time))
  tests_passed=$(grep -o "[0-9]\+ passed" test_output.tmp | head -1 | grep -o "[0-9]\+")
  time_taken=$(grep -o "([0-9.]\+s)" test_output.tmp | head -1 | tr -d '()')
  echo "  ✅ $tests_passed tests passed in $time_taken (Docker: ${duration}s)"
  total_tests=$((total_tests + tests_passed))
  total_time=$((total_time + duration))
else
  echo "  ❌ Failed"
fi
rm -f test_output.tmp
echo

# BotWarden
echo "Testing BotWarden (test:docker:antibot)..."
start_time=$(date +%s)
if npm run test:docker:antibot > test_output.tmp 2>&1; then
  end_time=$(date +%s)
  duration=$((end_time - start_time))
  tests_passed=$(grep -o "[0-9]\+ passed" test_output.tmp | head -1 | grep -o "[0-9]\+")
  time_taken=$(grep -o "([0-9.]\+s)" test_output.tmp | head -1 | tr -d '()')
  echo "  ✅ $tests_passed tests passed in $time_taken (Docker: ${duration}s)"
  total_tests=$((total_tests + tests_passed))
  total_time=$((total_time + duration))
else
  echo "  ❌ Failed"
fi
rm -f test_output.tmp
echo

echo "📊 Total Results:"
echo "- Total tests: $total_tests"
echo "- Total Docker time: ${total_time}s"
echo "- Average per site: $((total_time / 4))s"

# ヘルスチェック最終確認
echo
echo "🔍 Final Health Check:"
health_status=$(curl -s http://localhost:3000/api/health | jq -r '.status')
if [ "$health_status" = "healthy" ]; then
  echo "✅ All systems operational"
else
  echo "⚠️  Health status: $health_status"
fi

echo
echo "🎉 Test summary complete!"