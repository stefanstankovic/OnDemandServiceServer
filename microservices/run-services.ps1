cmd.exe /c "docker run -d -p 27017:27017 --name mongodb mongo"

Get-ChildItem | ?{ $_.PSIsContainer } | Foreach-Object {
    cd $_.FullName
    ./create-image.ps1
    ./start-server.ps1
    cd ..
}