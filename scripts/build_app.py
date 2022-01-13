# ATTENTION - START
# 
# iOS build config does not work localy!!!
# This is a know bug and this needs to be cofigured to use EAS CLI leater
# 
# ATTENTION - END

import os
import sys
import argparse
import subprocess
import glob
import shutil
import json
import base64

class COLOR:
  GRAY = '\x1b[02m'
  WHITE = '\x1b[0;39m'
  GREEN = '\x1b[29;42m'
  RED = '\x1b[39;41m'
  YELLOW = '\x1b[30;43m'

# SPECIFY COMMAND ARGs
parser = argparse.ArgumentParser(description='A custom app build script.')
parser.add_argument("appStore", help="Specify for what App store to build")
parser.add_argument("--publish", help="To run expo publish")
args = parser.parse_args()
build_OS = "android"
file_extension = ".aab"
app_Type = ""
if (args.appStore == "apple"):
 build_OS = "ios"
 file_extension = ".ipa"
if (args.appStore == "android"):
 build_OS = "android"
if (args.appStore == "amazon"):
 build_OS = "android"
 app_Type = "-t apk"
 file_extension = ".apk"

# SHELL SET ENVs
def setEnv(name, value):
  print(name + "=" + value)
  os.environ[name] = value

# SHELL SET BASE64 ENVs
def setEnvBASE64(name, file):
  print(name + "=" + file)
  data = open(file, "r").read()
  encoded = base64.b64encode(data)
  os.environ[name] = encoded

# SHELL RUN FUNCTION
def runShell(command, showCommand=""):
  if (showCommand):
    print(command)

  command_run = subprocess.call(command, shell=True)
  if command_run != 0:
    sys.exit(0)
 

# LOAD ENVs
print
print(COLOR.GREEN + " SETUP BUILD " + COLOR.WHITE)
WHOAMI = subprocess.check_output("whoami").strip()
jsonENV = open("env.json", "r")
ENV = json.load(jsonENV); jsonENV.close()
configFile = open("app.json", "r")
CONFIG = json.load(configFile); configFile.close()
BUILD_OUTPUT = '/Users/{}/expo-apps/'.format(WHOAMI)
OWNER_NAME = '@{}*'.format(CONFIG["expo"]['owner'])

print(COLOR.GRAY + "App: " + COLOR.WHITE + CONFIG["expo"]['name'] + " " + CONFIG["expo"]['version'])
print(COLOR.GRAY + "Build for: " + COLOR.WHITE + build_OS)

# WILL STOP ON BUILD IF BUILD COMMAND IS WRONG 
build_CMD = "sys.exit()"
if (build_OS == "ios"):
 build_CMD = "turtle build:ios -u EXPO_USERNAME -p EXPO_PASSWORD -c ./app.json --team-id {} --dist-p12-path {} --provisioning-profile-path {} -t archive".format(ENV['ios']["EXPO_APPLE_TEAM_ID"], ENV['ios']["EXPO_IOS_DIST_P12_BASE64"], ENV['ios']["EXPO_IOS_PROVISIONING_PROFILE_BASE64"])
else:
  build_CMD = "turtle build:{} -u EXPO_USERNAME -p EXPO_PASSWORD -c ./app.json --keystore-path {} --keystore-alias {} {}".format(build_OS, ENV['android']["KEYSTORE_FILE_NAME"], ENV['android']["KEYSTORE_ALIAS"]+"Alias", app_Type)

# START COMMAND EXECUTION
print
print(COLOR.GREEN + " INITIATE BUILD " + COLOR.WHITE)

# SET TERMINAL VARs
setEnv('EXPO_USERNAME', ENV['EXPO_USERNAME'])
setEnv('EXPO_PASSWORD', ENV['EXPO_PASSWORD'])
if (build_OS == "ios"):
  setEnv('EXPO_APPLE_TEAM_ID', ENV['ios']['EXPO_APPLE_TEAM_ID'])
  setEnv('EXPO_IOS_PUSH_P12_PASSWORD', "")
  setEnv('EXPO_IOS_DIST_P12_PASSWORD', ENV['ios']['EXPO_IOS_DIST_P12_PASSWORD'])
  setEnv('EXPO_IOS_DIST_P12_BASE64', ENV['ios']['EXPO_IOS_DIST_P12_BASE64'])
  setEnv('EXPO_IOS_PROVISIONING_PROFILE_BASE64', ENV['ios']['EXPO_IOS_PROVISIONING_PROFILE_BASE64'])
else:
  setEnv('EXPO_ANDROID_KEYSTORE_ALIAS', ENV['android']['KEYSTORE_ALIAS']+"Alias")
  setEnv('EXPO_ANDROID_KEYSTORE_PASSWORD', ENV['android']['EXPO_ANDROID_KEYSTORE_PASSWORD'])
  setEnv('EXPO_ANDROID_KEY_PASSWORD', ENV['android']['EXPO_ANDROID_KEY_PASSWORD'])

# EXPO PUBLISH
if (args.publish):
  runShell('expo publish')

# POINT TO JDK - not reliable, now done in prebuild.sh
if (build_OS != "ios"):
  print
  print(COLOR.GREEN + " POINT TO JDK " + COLOR.WHITE)
  runShell("export JAVA_HOME=$(/usr/libexec/java_home -v 1.8.0_275)", 'showCommand')

# SETUP TURTLE/CHECK TURTLE IS SETUP
print
print(COLOR.GREEN + " SETUP TURTLE! " + COLOR.WHITE)
runShell("turtle setup:{}".format(build_OS), 'showCommand')

# START TURTLE BUILD
print
print(COLOR.GREEN + " START TURTLE BUILD! " + COLOR.WHITE)
runShell(build_CMD, 'showCommand')

# MOVE BUILD FILE TO PROJECT BUILD FOLDER
print
print(COLOR.GREEN + " MOVE & RENAME BUILD " + COLOR.WHITE)
for file in glob.glob(BUILD_OUTPUT+OWNER_NAME):
  print(COLOR.GRAY + "File name: " + COLOR.WHITE + file.replace(BUILD_OUTPUT, ''))
  shutil.move(file, './build/{}'.format(ENV['android']["KEYSTORE_ALIAS"] + "_" + CONFIG["expo"]["version"] + file_extension))

# ALL DONE
print
print(COLOR.GREEN + " ALL DONE!!! " + COLOR.WHITE)