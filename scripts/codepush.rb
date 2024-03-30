require_relative 'colorize'

DEPLOY_ANDROID = 'Chimera-Studio/Negative-Harmony-1'
DEPLOY_IOS = 'Chimera-Studio/Negative-Harmony'
DEPLOY_PLATFORM = ARGV[0] == '--ios' ? DEPLOY_IOS : DEPLOY_ANDROID
DEPLOY_ENVIRONMENT = ARGV[1] == '--production' ? 'Production' : 'Staging'

if ARGV.length < 1
  puts
  puts 'Missing platform argument "--all / --android / --ios"'
  puts
  exit
end

if ARGV[0] != '--all' && ARGV[0] != '--android' && ARGV[0] != '--ios'
  puts
  puts 'Wrong platform argument, acceptable "--all / --android / --ios"'
  puts
  exit
end

if ARGV[1] == '--promote'
  if ARGV[0] == '--all'
    puts
    puts "Platform: " + " Android ".bg_green
    system("appcenter codepush promote -a #{DEPLOY_ANDROID} --mandatory -s Staging -d Production")
    puts
    puts "Platform: " + " iOS ".bg_green
    system("appcenter codepush promote -a #{DEPLOY_IOS} --mandatory -s Staging -d Production")
    puts
  else
    puts
    system("appcenter codepush promote -a #{DEPLOY_PLATFORM} --mandatory -s Staging -d Production")
    puts
  end
else
  if ARGV[0] == '--all'
    puts
    puts "Environment: " + " #{DEPLOY_ENVIRONMENT} ".bg_green
    puts
    puts "Platform: " + " Android ".bg_green
    system("appcenter codepush release-react -a #{DEPLOY_ANDROID} --mandatory -d #{DEPLOY_ENVIRONMENT}")
    puts
    puts "Platform: " + " iOS ".bg_green
    system("appcenter codepush release-react -a #{DEPLOY_IOS} --mandatory -d #{DEPLOY_ENVIRONMENT}")
    puts
  else
    puts
    puts "Environment: " + " #{DEPLOY_ENVIRONMENT} ".bg_green
    system("appcenter codepush release-react -a #{DEPLOY_PLATFORM} --mandatory -d #{DEPLOY_ENVIRONMENT}")
    puts
  end
end
