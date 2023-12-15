# The IaC folder

It's code, but infrastructure.

- How to package ([Dockerfile](Dockerfile))
- How to orchestrate locally ([docker-compose.yml](docker-compose.yml))
- How to define desired state for detailed infrastructure (k8s folder)

## It should be into another repo

Infrastructure as Code usually is versioned into a separated repository because
the industry says it's a good practice to make the deployment part completely
transparent to the application.

It should not matter for the application if it's being deployed in App Runner or
GCP, as long as minimum environment requirements are met.

But we do have IaC here in order to sample what the GitOps team should be
building in order to provision the environment needed by the application.

## Why kubernetes

See [complete article here](https://sombriks.com/blog/0058-containers-part-4-k8s-with-kind/).
