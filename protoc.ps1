
function ProtoBuilder ($FOLDER)
{
    $node_modules_directory = $FOLDER + "\node_modules"

    if (![System.IO.Directory]::Exists($node_modules_directory)) {
        Get-ChildItem $FOLDER | ?{ $_.PSIsContainer } | Foreach-Object {
            ProtoBuilder $_.FullName
        }

        return;
    }

    $PROTOC_GEN_TS_PATH = $node_modules_directory + "\.bin\protoc-gen-ts.cmd"
    $GRPC_TOOLS_NODE_PROTOC_PLUGIN = $node_modules_directory + "\grpc-tools\bin\grpc_node_plugin.exe"
    $GRPC_TOOLS_NODE_PROTOC = $node_modules_directory + "\.bin\grpc_tools_node_protoc.cmd"

    if (![System.IO.File]::Exists($PROTOC_GEN_TS_PATH) -Or 
        ![System.IO.File]::Exists($GRPC_TOOLS_NODE_PROTOC_PLUGIN)) {
            Write-Output "protoc-gen-ts.cmd, grpc_node_plugin.exe or grpc_tools_node_proto doesn't exist"
            return;
    }

    $proto_folder = $FOLDER + "\src\grpc\_proto";

    if (![System.IO.Directory]::Exists($proto_folder)) {
        Write-Output $proto_folder + " \r\n Doesn't exist"
        return;
    }

    Write-Output "Processing folder: $proto_folder "

    Get-ChildItem $proto_folder -Filter "*.proto" |  Foreach-Object {

        $file_name = $_.FullName

        Write-Output "Process file $file_name"
        
        $ts_output_dir = $proto_folder + "\" + $_.Name.Split('.')[0]
        $js_output_dir = $ts_output_dir.Replace("\src\", "\dist\")
        
        If(!(test-path $js_output_dir))
        {
            New-Item -ItemType Directory -Force -Path $js_output_dir
        }

        If(!(test-path $ts_output_dir))
        {
            New-Item -ItemType Directory -Force -Path $ts_output_dir
        }

        Write-Output "Crating js file."
        cmd.exe /c "$GRPC_TOOLS_NODE_PROTOC --js_out=import_style=commonjs,binary:$js_output_dir --grpc_out=$js_output_dir --plugin=protoc-gen-grpc=$GRPC_TOOLS_NODE_PROTOC_PLUGIN -I $proto_folder $file_name"

        Write-Output "Crating ts file."
        cmd.exe /c "$GRPC_TOOLS_NODE_PROTOC --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH --ts_out=$ts_output_dir -I $proto_folder $file_name"
    }
}

Get-ChildItem | ?{ $_.PSIsContainer } | Foreach-Object {
    ProtoBuilder $_.FullName
}