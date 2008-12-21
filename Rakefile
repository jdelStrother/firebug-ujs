task :default do
  puts "Rebuilding firebug_ujs.xpi"
  puts `rm firebug_ujs.xpi; cd unzipped_firebug_ujs; zip -r ../firebug_ujs.xpi *; cd ..;`
  puts "Rebuilt!"
end
