task :default => ['build']

desc 'Build firebug-ujs.xpi'
task :build do
  puts "Rebuilding firebug-ujs.xpi"
  puts `rm firebug-ujs.xpi; cd firebug-ujs; zip -r ../firebug-ujs.xpi *; cd ..;`
  puts "Rebuilt!"
end

desc 'Update the currently *installed* version'
task :update do
  begin
    installation_dir = `locate .mozilla | grep extensions | grep FirebugUJS.js`.split.first.sub('/chrome/firebugUJS/FirebugUJS.js', '')
    local_dir = File.dirname(__FILE__)
    puts `rm -r '#{installation_dir}'`
    exec "cp -rv '#{local_dir}/firebug-ujs' '#{installation_dir}'"
  rescue Exception => ex
    puts "D'oh, didn't work!  Are you on linux?  Do you have the FirebugUJS extension installed?"
    raise ex
  end
end
