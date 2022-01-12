import argparse
import subprocess
import json

class COLOR:
  PATH = '\x1b[02m'
  KEY = '\x1b[0;39m'
  GREEN = '\x1b[29;42m'
  RED = '\x1b[39;41m'
  YELLOW = '\x1b[30;43m'

parser = argparse.ArgumentParser(description='A custom app build script.')
parser.add_argument("appStore", help="Specify for what App store to build")
args = parser.parse_args()
BUILD_OS = 'ios' if args.appStore == 'apple' else 'android'

print
print(COLOR.GREEN + " Build setup " + COLOR.KEY)
jsonENV = open("env.json")
ENV = json.load(jsonENV); jsonENV.close()
BUILD_CMD = "turtle build:{} -u {} -p {} -c ./app.json --keystore-path ./{} --keystore-alias {}Alias".format(BUILD_OS, ENV['EXPO_USERNAME'], ENV['EXPO_PASSWORD'], ENV['KEYSTORE_FILE_NAME'], ENV['KEYSTORE_ALIAS'])

print(COLOR.PATH + "Build for: " + COLOR.KEY + BUILD_OS)
print(COLOR.PATH + "Point to JDK" + COLOR.KEY)
subprocess.call("/usr/libexec/java_home -V", shell=True)
subprocess.call("export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_275`", shell=True)
print
print(COLOR.GREEN + " Start turtle build! " + COLOR.KEY)
print(BUILD_CMD)
subprocess.call(BUILD_CMD, shell=True)
print

# Add ios build config
# Add bundletool script for amazon
# Add app relocation if possible with mv command