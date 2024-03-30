require 'json'
require_relative 'colorize'

SECRETS = JSON.parse(File.read('./env.json'))

if ARGV.length < 1
  puts
  puts 'Missing platform argument "--android / --ios"'
  puts
  exit
end

if ARGV[0] != '--android' && ARGV[0] != '--ios'
  puts
  puts 'Wrong platform argument, acceptable "--android / --ios"'
  puts
  exit
end

if ARGV[0] == '--android'
  ENV["RELEASE_KEYSTORE_PASSWORD"] = SECRETS['RELEASE_SECRETS']['RELEASE_KEYSTORE_PASSWORD']
  ENV["RELEASE_KEYSTORE_KEY_PASSWORD"] = SECRETS['RELEASE_SECRETS']['RELEASE_KEYSTORE_KEY_PASSWORD']
  ENV["RELEASE_KEYSTORE_KEY_ALIAS"] = SECRETS['RELEASE_SECRETS']['RELEASE_KEYSTORE_KEY_ALIAS']

  puts
  puts "Keystore Password: #{ENV["RELEASE_KEYSTORE_PASSWORD"]}"
  puts "Key Password: #{ENV["RELEASE_KEYSTORE_KEY_PASSWORD"]}"
  puts "Key Alias: #{ENV["RELEASE_KEYSTORE_KEY_ALIAS"]}"
  puts

  # Compile the JS code & assets
  system("react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/")
  # Remove created assets that break the build
  system("rm -rf android/app/src/main/res/drawable-*")

  if ARGV[1] == '--apk'
    system("cd android && ./gradlew assembleRelease && cd ..")
  else
    system("cd android && ./gradlew bundleRelease && cd ..")
  end
  puts
  exit
end

if ARGV[0] == '--ios'
  puts
  puts "iOS release should be done through Xcode"
  puts
  exit
end
