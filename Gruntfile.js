module.exports = function (grunt) {
  // Initial configuration
  grunt.initConfig({
    // Download external resources
    curl: {
      chromedriver: {
        //src: 'http://chromedriver.storage.googleapis.com/2.14/chromedriver_mac32.zip',
        // src: 'http://chromedriver.storage.googleapis.com/2.43/chromedriver_win32.zip',
        src: 'https://github.com/mozilla/geckodriver/releases/download/v0.23.0/geckodriver-v0.23.0-win64.zip',
        // dest: 'tmp/chromedriver.zip'
        dest: 'tmp/driver.zip'
      }
    },
 
    // Unzip resources
    unzip: {
      chromedriver: {
        //src: '<config:curl.chromedriver.dest>',
        src: 'tmp/driver.zip',
        dest: 'node_modules/.bin/'
      }
    }
  });
 
  // Load in grunt-curl and grunt-zip
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');
 
  // Create a task to update chromedriver
  grunt.registerTask('get-chromedriver', 'curl:chromedriver unzip:chromedriver')
 
  // Default task is to update chromedriver
  grunt.registerTask('default', 'get-chromedriver')
};
