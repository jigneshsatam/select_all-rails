# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'select_all/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "select_all-rails"
  spec.version       = SelectAll::Rails::VERSION
  spec.authors       = ["Jignesh Satam"]
  spec.email         = ["jigneshsatam@gmail.com"]

  if spec.respond_to?(:metadata)
    # spec.metadata['allowed_push_host'] = "Set to 'http://mygemserver.com' to prevent pushes to rubygems.org, or delete to allow pushes to any server."
  end

  spec.summary       = %q{Simple to select all checkboxes.}
  spec.description   = %q{Simple to select all checkboxes.}
  spec.homepage      = "https://github.com/JigneshSatam/select_all-rails"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features|node_modules)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.8"
  spec.add_development_dependency "rake", "~> 10.0"
end
