# The IaC folder

Whenever we already have a deployment strategy it's almost sure there is a bunch
of scripts used just for that purpose. Bash scripts, automation tools and so on.

## It should be into another repo

Infrastructure as Code usually is versioned into a separated repository because
the industry says it's a good practice to make the deployment part completely
transparent to the application.

It should not matter for the application if it's being deployed in App Runner or
GCP, as long as minimum environment requirements are met.

But we do have IaC here in order to sample what the GitOps team should be
building in order to provision the environment needed by the application.

## Why kubernetes

It's _de facto_ industry standards nowadays and despite it's complexity it does
a very decent job.

There are several flavors of it, managed and unmanaged, with different scale
capabilities.

Examples of managed kubernetes:

- [GKE](https://cloud.google.com/kubernetes-engine)
- [EKS](https://aws.amazon.com/eks/)
- [DOKS](https://digitalocean.com/products/kubernetes)

Examples of unmanaged kubernetes runtimes:

- [Official Kubernetes](https://kubernetes.io/releases/download/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)

## Running a kind cluster

Official Kubernetes is a heavy beast and Minikube is based on virtual machines;
on the other hand, Kind uses your current docker installation to provision a
small, single node cluster so it's possible to test IaC artifacts locally with
little effort.

Before create a cluster, you MUST met the following requisites:

- docker 20 or newer properly [installed](https://docs.docker.com/engine/install/)
  and [configured](https://docs.docker.com/engine/install/linux-postinstall/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) 1.27 or newer
- (optional) [golang](https://go.dev/doc/install) to easier perform kind
  installation; also make sure that `$HOME/go/bin`  is present on `$PATH`
- (optional) [k9s](https://k9scli.io/) to get a easier overview of cluster state
- (optional) [intellij ultimate with kubernetes plugin](https://www.jetbrains.com/help/idea/kubernetes.html)
  for the same reason
- (optional) [vscode with kubernetes plugin](https://code.visualstudio.com/docs/azure/kubernetes)
  for the same reason

The easiest way to [install kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installing-from-source) is:

```bash
go install sigs.k8s.io/kind@latest
```

Once you get the cli app, you can create a cluster with:

```bash
kind create cluster
```

There! cluster created, you can use `kubectl` to interact with your brand new
cluster:

```bash
sombriks@thanatos:~/git/simple-knex-koa-example> kubectl get nodes -o wide
NAME                 STATUS   ROLES           AGE     VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE                         KERNEL-VERSION    CONTAINER-RUNTIME
kind-control-plane   Ready    control-plane   6h21m   v1.27.3   172.18.0.2    <none>        Debian GNU/Linux 11 (bullseye)   6.5.9-1-default   containerd://1.7.1
```

## How a Kubernetes cluster is organized

For starters, it's a cluster of [nodes](https://kubernetes.io/docs/concepts/architecture/nodes/).

Usually there are more than one node so your services can offer high
availability and zero downtime.

[Workloads](https://kubernetes.io/docs/concepts/workloads/) are distributed
across all nodes, they are how we call your applications in Kubernetes.

In order to make those applications available to each other _inside_ the cluster,
a [network service](https://kubernetes.io/docs/concepts/services-networking/)
must be defined.

There are much more, but let's focus on those two, since they are the minimum
needed to spin up our application.

## Deploying the database

Our sample application, when in development mode, uses a small sqlite database.
When in production mode, however, the task is up to the
[postgres database engine](https://www.postgresql.org/docs/).

The workload we'll use to deploy the database is called
[stateful set](https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/).

It has this name because, unlike a
[deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/),
the app state isn't considered discardable.

To create the stateful set in the cluster use the following command:

```bash
# cd infrastructure
kubectl apply -f k8s/workloads/db-stateful-set.yml
```

Then you create the service which will expose this workload:

```bash
# cd infrastructure
kubectl apply -f k8s/network/db-service.yml
```

There! we got the database. We'll address ways of how to test in a moment.

## Deploying the application

In order to offer high availability, we can use deployments do define
[replica sets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
and keep versions of them. That way, if a deployment update fails, it's always
possible to rollback to a previous known stable state.

Use the following command to apply the deployment manifest file:

```bash
# cd infrastructure
kubectl apply -f k8s/workloads/simple-knex-koa-deployment.yml
```

This command probably might end up in a strange error:

```bash
sombriks@thanatos:~/git/simple-knex-koa-example/infrastructure> kubectl get pods
NAME                                          READY   STATUS         RESTARTS   AGE
db-stateful-set-0                             1/1     Running        0          171m
simple-knex-koa-deployment-5585dc79b-q55wc    0/1     ErrImagePull   0          3m13s

sombriks@thanatos:~/git/simple-knex-koa-example/infrastructure> kubectl logs simple-knex-koa-deployment-5585dc79b-q55wc
Error from server (BadRequest): container "simple-knex-koa" in pod "simple-knex-koa-deployment-5585dc79b-q55wc" is waiting to start: trying and failing to pull image
```

This happens because the image created isn't available in the
[docker public registry](https://hub.docker.com/).

Fortunately, kind offers a way to _import_ our local image:

```bash
kind load docker-image sombriks/simple-knex-koa:development
```

Sample output:

```bash
sombriks@thanatos:~/git/simple-knex-koa-example> kind load docker-image sombriks/simple-knex-koa:development
Image: "sombriks/simple-knex-koa:development" with ID "sha256:5cd14aad3bc9dc9487fe72a9f9f3fb11f902bb3c58bbfbc3c9b7f8676976cd51" not yet present on node "kind-control-plane", loading...
```

Now we're good to the next step, the service configuration.

Like the database, we need to deploy the service as well if we want to make it
available:

```bash
# cd infrastructure
kubectl apply -f k8s/network/simple-knex-koa-service.yml
```

And finally there, workload and service properly deployed.

Take a detailed look at the manifest yaml files for detailed comprehension of
what just happened here.

## Noteworthy configuration details

Once workloads are deployed, they can communicate to each other using the IP
addresses. However it isn't the proper way to make workloads talk each other.

Instead, define the services and the the service name will be resolved inside
the pods.

This is why the `PG_CONNECTION_URL` variable has `db-service` in the hostname
part: this is the value of `metadata.name` inside
[db-service.yml](k8s/network/db-service.yml).

Labels are important. It's thanks to labels that services can connect with pods.

## How to (finally) check if my service is running

If you noticed, all we did was to put our application inside a kubernetes
cluster with no contact with the outside world.

### Port-forward

The quickest way to check if everything is working as expecte is performing a
[port-forward](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/):

```bash
kubectl port-forward services/simple-knex-koa-service 3000
```

You can port-forward pods, deployments and services.

### NodePort

It is possible to define the type of the service to
[NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport)
and that way get a exposed port on public ip for the service.

However, `kind` has some trouble with the public ip part, so we're not using it
today.

### Ingress controller

An [Ingress controller](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx)
acts as an [API Gateway](https://tibco.com/reference-center/what-is-an-api-gateway)
and exposes the services through http requests and uri's.

In order to use an ingress we would need to recreate our cluster, so we'll see
that approach later.

## Further steps

The kind cluster is good to test things locally before apply them to a real
production cluster, and covers mostly all scenarios.

Noteworthy missing ones are a simple ingress setup and public ip to the pods
inside the cluster.

Besides that, in order to properly execute a Continuous deployment scenario, one
could install [FluxCD](https://fluxcd.io/) or [ArgoCD](https://argoproj.github.io/cd/)
inside the cluster, configure it to observe the infrastructure folder and then
use is as source of truth for the cluster's desired state.

