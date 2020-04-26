<#
    .SYNOPSIS
        This script will run swarm
#>

$DRIVER = "hyperv"
$DISK_SIZE = "20000"
$MEMORY = "512"
$DOCKER_VERSION="https://github.com/boot2docker/boot2docker/releases/download/v1.13.0/boot2docker.iso"
$ADDITIONAL_PARAMS="--hyperv-virtual-switch ""Virtual Switch 2"" --hyperv-disk-size $DISK_SIZE --hyperv-memory $MEMORY --hyperv-boot2docker-url=$DOCKER_VERSION"

# docker-machine create --driver hyperv --hyperv-virtual-switch "Virtual Switch 2" --hyperv-disk-size 1024 --hyperv-memory 512 --hyperv-boot2docker-url https://github.com/boot2docker/boot2docker/releases/download/v1.13.0/boot2docker.iso manager4
Function CreateManagerNodes([string[]]$ManagerNodes) {
    foreach ($Manager in $ManagerNodes)
    {
        Write-Output "Create manager $Manager"
        Invoke-Expression "docker-machine create --driver $DRIVER $ADDITIONAL_PARAMS $Manager"
        Write-Output "Manger $Manager created"
    }
}

Function CreateWorkersNodes([string[]]$WorkerNodes) {
    foreach ($Worker in $WorkerNodes)
    {
        Write-Output "Create wroker $Worker"
        Invoke-Expression "docker-machine create --driver $DRIVER $ADDITIONAL_PARAMS $Worker"
        Write-Output "Wroker $Worker created"
    }
}

Function InitSwarmManager([string[]]$ManagerNodes) {
    foreach ($Manager in $ManagerNodes)
    {
        Write-Output "======> Initializing first swarm $Manager ..."
        Invoke-Expression "docker-machine ssh $Manager docker swarm init --advertise-addr $(getIP $Manager)"
    }
}

Function JoinWorkersToSwarm([string[]]$ManagerNodes, $Manager) {
    foreach ($Worker in $WorkerNodes)
    {
        Write-Output "======> $Worker joining swarm as worker ..."
        Invoke-Expression "docker-machine ssh $Worker docker swarm join --token $(get_worker_token) $(getIP $Manager):2377"
    }
}

Function Status() {
    Write-Output "-> list swarm nodes"
    Invoke-Expression "docker-machine ssh manager1 docker node ls"
    Write-Output "-> list machines"
    Invoke-Expression "docker-machine ls"
}

Function StartRancherOS {
    Write-Output "-> Starting RancherOS to monitor the cluster"
    Invoke-Expression "docker-machine ssh manager1 docker run --name rancher --restart=unless-stopped -p 9000:8080 -d rancher/server"
}

Function main() {
    $Managers = @("manager-node-1")
    $Workers = @("worker-node-1", "worker-node-2")
    CreateManagerNodes($Managers)
    CreateWorkersNodes($Workers)
    InitSwarmManager($Managers)
    JoinWorkersToSwarm($Workers, "manager-node-1")
    Status

}

Function reset {
    try {
        Invoke-Expression "docker-machine rm manager-node-1 worker-node-1 worker-node-2 -y"
    }
    catch {}
}

reset
main