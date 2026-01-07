#!/usr/bin/env ruby
require 'find'
SKIP_DIRS = ['.git', '.bundle', 'vendor', '_site'].freeze
VALID_EXTENSIONS = %w[.html .htm .md .markdown .css .js .json .yml .yaml .xml .liquid].freeze
errors = []
Find.find('.') do |path|
  next if File.directory?(path)
  next if SKIP_DIRS.any? { |skip| path.split(/[\\\/]/).include?(skip) }
  next unless VALID_EXTENSIONS.include?(File.extname(path))
  data = File.binread(path)
  if data.start_with?("\xEF\xBB\xBF")
    errors << "BOM detected: #{path}"
    next
  end
  unless data.force_encoding('UTF-8').valid_encoding?
    errors << "Invalid UTF-8: #{path}"
  end
end
total = errors.size
if total.positive?
  warn "Encoding check failed (#{total} files):"
  errors.each { |msg| warn "  - #{msg}" }
  exit 1
end
