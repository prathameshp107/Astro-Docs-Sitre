---
title: "AWS CLI Cheat Sheet"
description: "Quick-reference cheat sheet for AWS CLI commands — IAM, EC2, Lambda, S3, RDS, networking, and more."
sidebar:
  order: 2
---

## AWS CLI Cheat Sheet

> **One-page quick reference** for AWS CLI commands. Bookmark this for daily use. All commands use the `aws` CLI v2.

---

### AWS Services Overview

```mermaid
flowchart TB
    AWS[\"☁️ AWS Cloud\"] --> Compute[\"🖥️ Compute\"] --> EC2[\"EC2<br/>Virtual Servers\"]
    Compute --> Lambda[\"⚡ Lambda<br/>Serverless Functions\"]
    Compute --> EB[\"Beanstalk<br/>PaaS Deploy\"]

    AWS --> Storage[\"💾 Storage\"] --> S3[\"S3<br/>Object Storage\"]
    Storage --> EBS[\"EBS<br/>Block Storage\"]
    Storage --> EFS[\"EFS<br/>File Storage\"]

    AWS --> DB[\"🗄️ Database\"] --> RDS[\"RDS<br/>SQL Databases\"]
    DB --> DynamoDB[\"DynamoDB<br/>NoSQL\"]
    DB --> ElastiCache[\"ElastiCache<br/>Redis/Memcached\"]

    AWS --> Network[\"🌐 Networking\"] --> VPC[\"VPC<br/>Virtual Network\"]
    Network --> CF[\"CloudFront<br/>CDN\"]
    Network --> R53[\"Route53<br/>DNS\"]
    Network --> ELB[\"ELB<br/>Load Balancer\"]

    AWS --> Security[\"🔒 Security\"] --> IAM[\"IAM<br/>Access Control\"]
    Security --> KMS[\"KMS<br/>Encryption\"]
    Security --> WAF[\"WAF<br/>Web Firewall\"]

    AWS --> Integration[\"🔗 Integration\"] --> SQS[\"SQS<br/>Message Queues\"]
    Integration --> SNS[\"SNS<br/>Notifications\"]
    Integration --> APIGW[\"API Gateway<br/>HTTP APIs\"]

    AWS --> Tools[\"🛠️ DevOps\"] --> CFT[\"CloudFormation<br/>IaC\"]
    Tools --> CW[\"CloudWatch<br/>Monitoring\"]
    Tools --> CodePipeline[\"CodePipeline<br/>CI/CD\"]

    style AWS fill:#7c3aed,color:#fff
    style Compute fill:#3b82f6,color:#fff
    style Storage fill:#059669,color:#fff
    style DB fill:#f59e0b,color:#fff
    style Network fill:#ef4444,color:#fff
    style Security fill:#dc2626,color:#fff
    style Integration fill:#6366f1,color:#fff
    style Tools fill:#10b981,color:#fff
```

---

### 🔧 CLI Setup & Common Flags

```bash
# Configure CLI
aws configure                              # Set access key, secret, region, output
aws configure set region us-east-1         # Set default region
aws configure list                         # Show current config

# Profile management
aws configure --profile production         # Create named profile
aws s3 ls --profile production             # Use named profile
export AWS_PROFILE=production              # Set active profile

# Common flags
--region us-east-1                         # Override region
--output json | table | text               # Output format
--profile my-profile                       # Use specific profile
--query 'Reservations[].Instances[].InstanceId'  # JMESPath query filter
--no-sign-request                          # Access public resources without auth
--dry-run                                  # Validate without executing

# Help
aws help                                   # General help
aws ec2 help                               # Service-specific help
aws ec2 run-instances help                 # Command-specific help
```

---

### 👤 IAM — Identity & Access Management

```bash
# Users
aws iam create-user --user-name alice
aws iam list-users --query 'Users[*].[UserName,UserId]' --output table
aws iam get-user --user-name alice
aws iam delete-user --user-name alice

# Groups
aws iam create-group --group-name developers
aws iam add-user-to-group --user-name alice --group-name developers
aws iam list-groups-for-user --user-name alice
aws iam remove-user-from-group --user-name alice --group-name developers

# Policies
aws iam create-policy --policy-name my-policy --policy-document file://policy.json
aws iam attach-user-policy --user-name alice --policy-arn arn:aws:iam::123:policy/my-policy
aws iam attach-group-policy --group-name developers --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
aws iam list-attached-user-policies --user-name alice

# Roles
aws iam create-role --role-name ec2-s3-access --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name ec2-s3-access --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

# Keys & security
aws iam create-access-key --user-name alice
aws iam list-access-keys --user-name alice
aws iam update-access-key --access-key-id AKIA... --status Inactive --user-name alice
aws iam delete-access-key --access-key-id AKIA... --user-name alice
```

---

### 🖥️ EC2 — Virtual Servers

```bash
# Instances
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro --key-name my-key --security-groups web-sg
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"
aws ec2 describe-instances --query 'Reservations[].Instances[].{ID:InstanceId,Type:InstanceType,State:State.Name}'
aws ec2 stop-instances --instance-ids i-1234567890abcdef0
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
aws ec2 reboot-instances --instance-ids i-1234567890abcdef0

# Security groups
aws ec2 create-security-group --group-name web-sg --description "Web server SG"
aws ec2 authorize-security-group-ingress --group-id sg-123 --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-123 --protocol tcp --port 22 --cidr 203.0.113.0/32
aws ec2 revoke-security-group-ingress --group-id sg-123 --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 describe-security-groups --group-ids sg-123

# Key pairs
aws ec2 create-key-pair --key-name my-key --query 'KeyMaterial' --output text > my-key.pem
aws ec2 describe-key-pairs
aws ec2 delete-key-pair --key-name my-key

# AMIs & snapshots
aws ec2 describe-images --owners amazon --filters "Name=name,Values=amzn2-ami-*" --query 'Images[*].[ImageId,Name]' --output table
aws ec2 create-image --instance-id i-123 --name "My Backup $(date +%Y-%m-%d)"
aws ec2 describe-snapshots --owner-ids self
aws ec2 create-snapshot --volume-id vol-123 --description "Pre-update snapshot"

# EBS volumes
aws ec2 describe-volumes
aws ec2 attach-volume --volume-id vol-123 --instance-id i-456 --device /dev/xvdf
aws ec2 create-volume --volume-type gp3 --size 100 --availability-zone us-east-1a

# Tags
aws ec2 create-tags --resources i-123 --tags Key=Environment,Value=Production Key=Name,Value=WebServer
aws ec2 describe-tags --filters "Name=resource-id,Values=i-123"

# Elastic IP
aws ec2 allocate-address --domain vpc
aws ec2 associate-address --instance-id i-123 --allocation-id eipalloc-456
aws ec2 release-address --allocation-id eipalloc-456
```

---

### ⚡ Lambda — Serverless Functions

```bash
# Functions
aws lambda create-function --function-name process-uploads --runtime python3.12 --role arn:aws:iam::123:role/lambda-exec --handler lambda_function.lambda_handler --zip-file fileb://function.zip
aws lambda list-functions --query 'Functions[*].[FunctionName,Runtime,MemorySize]' --output table
aws lambda get-function --function-name process-uploads
aws lambda update-function-code --function-name process-uploads --zip-file fileb://function.zip
aws lambda update-function-configuration --function-name process-uploads --memory-size 512 --timeout 30
aws lambda delete-function --function-name process-uploads

# Invoke
aws lambda invoke --function-name process-uploads --payload '{"key":"value"}' response.json
aws lambda invoke --function-name process-uploads --invocation-type Event --payload file://event.json output.txt

# Permissions
aws lambda add-permission --function-name process-uploads --statement-id s3-invoke --action lambda:InvokeFunction --principal s3.amazonaws.com --source-arn arn:aws:s3:::my-bucket

# Event source mappings
aws lambda create-event-source-mapping --function-name process-uploads --event-source-arn arn:aws:sqs:us-east-1:123:my-queue --batch-size 10
aws lambda list-event-source-mappings --function-name process-uploads

# Versions & aliases
aws lambda publish-version --function-name process-uploads
aws lambda create-alias --function-name process-uploads --name prod --function-version 2
aws lambda update-alias --function-name process-uploads --name prod --function-version 3

# Concurrency
aws lambda put-function-concurrency --function-name process-uploads --reserved-concurrent-executions 10
aws lambda delete-function-concurrency --function-name process-uploads
```

---

### 💾 S3 — Object Storage

```bash
# Buckets
aws s3 mb s3://my-app-assets --region us-east-1
aws s3 ls                                    # List all buckets
aws s3api list-buckets --query 'Buckets[*].[Name,CreationDate]' --output table
aws s3 rb s3://my-app-assets --force         # Remove bucket (must be empty first)

# Objects
aws s3 cp index.html s3://my-app-assets/
aws s3 cp logo.png s3://my-app-assets/images/ --acl public-read
aws s3 cp s3://my-app-assets/index.html ./downloads/
aws s3 sync ./build s3://my-app-assets/      # Sync local folder → S3
aws s3 sync s3://my-app-assets ./backup/     # Sync S3 → local
aws s3 mv s3://bucket/old.jpg s3://bucket/new.jpg
aws s3 rm s3://my-app-assets/old-file.txt
aws s3 rm s3://my-app-assets/ --recursive    # Delete all objects

# Listing & filters
aws s3 ls s3://my-app-assets/                # List root
aws s3 ls s3://my-app-assets/images/         # List "folder"
aws s3 ls s3://my-app-assets/ --recursive    # List all
aws s3 ls s3://my-app-assets/ --human-readable --summarize
aws s3api list-objects --bucket my-app-assets --query 'Contents[?Size > `1000000`].[Key,Size]'

# Presigned URLs
aws s3 presign s3://my-app-assets/private-file.pdf --expires-in 3600   # 1 hour URL
aws s3 presign s3://my-app-assets/private-file.pdf --expires-in 86400  # 24 hours

# Static website
aws s3 website s3://my-app-assets --index-document index.html --error-document error.html

# Bucket policy
aws s3api get-bucket-policy --bucket my-app-assets
aws s3api put-bucket-policy --bucket my-app-assets --policy file://policy.json

# Versioning & encryption
aws s3api put-bucket-versioning --bucket my-app-assets --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket my-app-assets --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

# Lifecycle rules
aws s3api put-bucket-lifecycle-configuration --bucket my-app-assets --lifecycle-configuration file://lifecycle.json

# Multipart (large files)
aws s3 cp large-file.iso s3://my-app-assets/  # Auto-uses multipart for files > 100MB
```

---

### 🗄️ RDS & DynamoDB — Databases

```bash
# RDS
aws rds create-db-instance --db-instance-identifier mydb --db-instance-class db.t3.micro --engine postgres --master-username admin --master-user-password secret123 --allocated-storage 20
aws rds describe-db-instances --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceClass,DBInstanceStatus]' --output table
aws rds modify-db-instance --db-instance-identifier mydb --db-instance-class db.t3.small --apply-immediately
aws rds reboot-db-instance --db-instance-identifier mydb
aws rds delete-db-instance --db-instance-identifier mydb --skip-final-snapshot

# RDS snapshots
aws rds create-db-snapshot --db-instance-identifier mydb --db-snapshot-identifier mydb-pre-upgrade
aws rds describe-db-snapshots --db-instance-identifier mydb
aws rds restore-db-instance-from-db-snapshot --db-instance-identifier mydb-restored --db-snapshot-identifier mydb-pre-upgrade

# RDS read replicas
aws rds create-db-instance-read-replica --db-instance-identifier mydb-read --source-db-instance-identifier mydb

# DynamoDB
aws dynamodb create-table --table-name users --attribute-definitions AttributeName=userId,AttributeType=S --key-schema AttributeName=userId,KeyType=HASH --billing-mode PAY_PER_REQUEST
aws dynamodb list-tables
aws dynamodb describe-table --table-name users
aws dynamodb put-item --table-name users --item '{"userId":{"S":"u123"},"name":{"S":"Alice"},"email":{"S":"alice@example.com"}}'
aws dynamodb get-item --table-name users --key '{"userId":{"S":"u123"}}'
aws dynamodb query --table-name users --key-condition-expression "userId = :id" --expression-attribute-values '{":id":{"S":"u123"}}'
aws dynamodb scan --table-name users
aws dynamodb update-item --table-name users --key '{"userId":{"S":"u123"}}' --update-expression "SET #n = :n" --expression-attribute-names '{"#n":"name"}' --expression-attribute-values '{":n":{"S":"Alice Smith"}}'
aws dynamodb delete-table --table-name users
```

---

### 🌐 VPC, Route53 & CloudFront — Networking

```bash
# VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16
aws ec2 describe-vpcs
aws ec2 create-subnet --vpc-id vpc-123 --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-123"
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --vpc-id vpc-123 --internet-gateway-id igw-456
aws ec2 create-nat-gateway --subnet-id subnet-pub --allocation-id eipalloc-789
aws ec2 describe-route-tables --filters "Name=vpc-id,Values=vpc-123"
aws ec2 create-route --route-table-id rtb-abc --destination-cidr-block 0.0.0.0/0 --gateway-id igw-456

# VPC Peering
aws ec2 create-vpc-peering-connection --vpc-id vpc-123 --peer-vpc-id vpc-456
aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id pcx-789
aws ec2 create-route --route-table-id rtb-abc --destination-cidr-block 10.1.0.0/16 --vpc-peering-connection-id pcx-789

# Route53
aws route53 create-hosted-zone --name example.com --caller-reference 2024-01-01
aws route53 list-hosted-zones
aws route53 change-resource-record-sets --hosted-zone-id Z123 --change-batch file://records.json
aws route53 list-resource-record-sets --hosted-zone-id Z123
# records.json format: {"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"www.example.com.","Type":"A","AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"d123.cloudfront.net"}}}]}

# CloudFront
aws cloudfront create-distribution --origin-domain-name my-app-assets.s3.us-east-1.amazonaws.com --default-root-object index.html --enabled
aws cloudfront list-distributions --query 'DistributionList.Items[*].[Id,DomainName,Status]' --output table
aws cloudfront get-distribution --id E123456
aws cloudfront create-invalidation --distribution-id E123456 --paths "/*" "/images/*"
aws cloudfront update-distribution --id E123456 --distribution-config file://config.json

# ELB (Load Balancer)
aws elbv2 create-load-balancer --name my-alb --subnets subnet-pub1 subnet-pub2 --security-groups sg-123
aws elbv2 describe-load-balancers
aws elbv2 create-target-group --name my-tg --protocol HTTP --port 80 --vpc-id vpc-123 --health-check-path /health
aws elbv2 register-targets --target-group-arn arn:aws:elasticloadbalancing:.../my-tg --targets Id=i-123 Id=i-456
aws elbv2 create-listener --load-balancer-arn arn:aws:elasticloadbalancing:.../my-alb --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=arn:aws:.../my-tg

# Auto Scaling
aws autoscaling create-auto-scaling-group --auto-scaling-group-name my-asg --launch-configuration-name my-lc --min-size 2 --max-size 10 --desired-capacity 2 --vpc-zone-identifier subnet-pub1,subnet-pub2
aws autoscaling describe-auto-scaling-groups
aws autoscaling update-auto-scaling-group --auto-scaling-group-name my-asg --desired-capacity 4
aws autoscaling attach-load-balancer-target-groups --auto-scaling-group-name my-asg --target-group-arns arn:aws:.../my-tg
aws autoscaling put-scaling-policy --auto-scaling-group-name my-asg --policy-name cpu-target --policy-type TargetTrackingScaling --target-tracking-configuration '{ "TargetValue": 70.0, "PredefinedMetricSpecification": { "PredefinedMetricType": "ASGAverageCPUUtilization" } }'
```

---

### 🔗 SQS, SNS & API Gateway — Messaging

```bash
# SQS
aws sqs create-queue --queue-name my-app-queue
aws sqs list-queues
aws sqs get-queue-url --queue-name my-app-queue
aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue --message-body '{"orderId":123}'
aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue --message-body '{"type":"urgent"}' --message-group-id orders --message-deduplication-id unique123
aws sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue --max-number-of-messages 10 --visibility-timeout 30
aws sqs delete-message --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue --receipt-handle AQEB...
aws sqs purge-queue --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue
aws sqs delete-queue --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue

# SQS FIFO (strict ordering, exactly-once)
aws sqs create-queue --queue-name my-app-queue.fifo --attributes FifoQueue=true,ContentBasedDeduplication=true

# SNS
aws sns create-topic --name order-alerts
aws sns list-topics
aws sns subscribe --topic-arn arn:aws:sns:us-east-1:123:order-alerts --protocol email --notification-endpoint admin@example.com
aws sns subscribe --topic-arn arn:aws:sns:us-east-1:123:order-alerts --protocol lambda --notification-endpoint arn:aws:lambda:us-east-1:123:function:process-order
aws sns list-subscriptions-by-topic --topic-arn arn:aws:sns:us-east-1:123:order-alerts
aws sns publish --topic-arn arn:aws:sns:us-east-1:123:order-alerts --message "New order #12345 received"
aws sns publish --topic-arn arn:aws:sns:us-east-1:123:order-alerts --message-structure json --message '{"default":"New order","email":"<html>New order</html>"}'
aws sns unsubscribe --subscription-arn arn:aws:sns:us-east-1:123:order-alerts:sub-xyz
aws sns delete-topic --topic-arn arn:aws:sns:us-east-1:123:order-alerts

# API Gateway
aws apigateway create-rest-api --name my-api --region us-east-1
aws apigateway get-rest-apis
aws apigateway create-resource --rest-api-id abc123 --parent-id root-id --path-part users
aws apigateway put-method --rest-api-id abc123 --resource-id res456 --http-method GET --authorization-type NONE
aws apigateway put-integration --rest-api-id abc123 --resource-id res456 --http-method GET --type AWS_PROXY --integration-http-method POST --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123:function:get-users/invocations
aws apigateway create-deployment --rest-api-id abc123 --stage-name prod
```

---

### 🛠️ CloudFormation & CloudWatch — DevOps

```bash
# CloudFormation
aws cloudformation create-stack --stack-name my-web-app --template-body file://template.yaml --parameters ParameterKey=InstanceType,ParameterValue=t2.micro
aws cloudformation create-stack --stack-name my-web-app --template-url https://s3.amazonaws.com/bucket/template.yaml
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE
aws cloudformation describe-stacks --stack-name my-web-app
aws cloudformation describe-stack-events --stack-name my-web-app
aws cloudformation update-stack --stack-name my-web-app --template-body file://template.yaml
aws cloudformation delete-stack --stack-name my-web-app

# CloudFormation change sets (preview before applying)
aws cloudformation create-change-set --stack-name my-web-app --template-body file://template.yaml --change-set-name my-change
aws cloudformation describe-change-set --change-set-name my-change --stack-name my-web-app
aws cloudformation execute-change-set --change-set-name my-change --stack-name my-web-app

# CloudWatch
aws logs describe-log-groups --query 'logGroups[*].[logGroupName,storedBytes]' --output table
aws logs describe-log-streams --log-group-name /aws/lambda/process-uploads --order-by LastEventTime --descending --limit 5
aws logs filter-log-events --log-group-name /aws/lambda/process-uploads --filter-pattern "ERROR" --start-time $(date -d '1 hour ago' +%s%3N)
aws logs get-log-events --log-group-name /aws/lambda/process-uploads --log-stream-name "2024/01/01/[$LATEST]abc123"

# CloudWatch metrics & alarms
aws cloudwatch list-metrics --namespace AWS/EC2 --metric-name CPUUtilization
aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-123 --start-time 2024-01-01T00:00:00Z --end-time 2024-01-02T00:00:00Z --period 3600 --statistics Average
aws cloudwatch put-metric-alarm --alarm-name high-cpu --alarm-description "CPU > 80%" --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --evaluation-periods 2 --threshold 80 --comparison-operator GreaterThanThreshold --dimensions Name=InstanceId,Value=i-123 --alarm-actions arn:aws:sns:us-east-1:123:alerts

# CloudWatch logs to S3 (export)
aws logs create-export-task --log-group-name /aws/lambda/process-uploads --from $(date -d '7 days ago' +%s%3N) --to $(date +%s%3N) --destination my-logs-bucket --destination-prefix lambda-logs
```

---

### 💰 Cost Management

```bash
# Budgets
aws budgets create-budget --account-id 123456789012 --budget file://budget.json --notifications-with-subscribers file://subscribers.json
# budget.json: {"BudgetName":"monthly-budget","BudgetLimit":{"Amount":"100","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}

# Cost Explorer (outputs JSON)
aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-01-31 --granularity MONTHLY --metrics BlendedCost --group-by Type=DIMENSION,Key=SERVICE

# Resource groups & tagging
aws resourcegroupstaggingapi get-resources --tag-filters Key=Environment,Values=Production
aws resourcegroupstaggingapi get-tag-keys
```

---

### 🚀 Quick Reference Tables

**EC2 Instance Families**

| Family | Use Case | Example |
|--------|----------|---------|
| **t** (burstable) | General purpose, low cost | `t2.micro`, `t3.medium` |
| **m** (general) | Balanced apps | `m5.large`, `m6g.xlarge` |
| **c** (compute) | CPU-intensive | `c5.xlarge`, `c6g.2xlarge` |
| **r** (memory) | RAM-intensive | `r5.large`, `x1e.xlarge` |
| **g/p** (GPU) | ML, rendering | `g4dn.xlarge`, `p3.2xlarge` |

**S3 Storage Classes**

| Class | Retrieval | Cost | Use Case |
|-------|-----------|------|----------|
| **Standard** | Instant | $$$ | Active data |
| **Intelligent-Tiering** | Instant | $$ | Unknown patterns |
| **Standard-IA** | Instant | $$ | Infrequent access |
| **Glacier** | Minutes | $ | Archives |
| **Glacier Deep Archive** | Hours | ¢ | Long-term |

**AWS Regions Quick Pick**

| Code | Location | Notes |
|------|----------|-------|
| `us-east-1` | N. Virginia | Oldest, most services |
| `us-east-2` | Ohio | Low latency for US |
| `us-west-2` | Oregon | Popular west coast |
| `eu-west-1` | Ireland | EU main region |
| `ap-southeast-1` | Singapore | Asia-Pacific |

---

### 📝 Pro Tips

```bash
# JMESPath queries — filter JSON output like a pro
aws ec2 describe-instances --query 'Reservations[].Instances[?State.Name==`running`].{ID:InstanceId,Type:InstanceType,IP:PublicIpAddress}' --output table

# Combine with jq for complex processing
aws ec2 describe-instances --region us-east-1 | jq '.Reservations[].Instances[] | {id: .InstanceId, type: .InstanceType}'

# Shell aliases for speed
alias aws-instances='aws ec2 describe-instances --query "Reservations[].Instances[].{ID:InstanceId,Type:InstanceType,State:State.Name,IP:PublicIpAddress}" --output table'
alias aws-cost='aws ce get-cost-and-usage --time-period Start=$(date +%Y-%m-01),End=$(date +%Y-%m-%d) --granularity MONTHLY --metrics BlendedCost --group-by Type=DIMENSION,Key=SERVICE --output table'

# Environment variables (instead of aws configure)
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
export AWS_SESSION_TOKEN=...            # For temporary credentials (STS)
export AWS_DEFAULT_REGION=us-east-1
export AWS_DEFAULT_OUTPUT=json

# MFA with STS (get temp credentials)
aws sts get-session-token --serial-number arn:aws:iam::123:mfa/user --token-code 123456

# Assume role (cross-account access)
aws sts assume-role --role-arn arn:aws:iam::456:role/deploy-role --role-session-name deploy-session

# Wait for resource state (great for scripts)
aws ec2 wait instance-running --instance-ids i-123
aws ec2 wait instance-terminated --instance-ids i-123
aws s3api wait bucket-exists --bucket my-app-assets
```

---

### In Simple Words

- **`aws configure`** is your first command — set up access keys, region, and output format
- Use `--query` with **JMESPath** to filter JSON output without piping to `jq`
- **Tag everything** (`Key=Environment,Value=Production`) — makes cost tracking and filtering easy
- Use `aws <service> wait` in scripts to **pause until resources are ready**; enable tab completion with `complete -C aws_completer aws`
- The `date` examples (`-d '1 hour ago'`) use **GNU date** — on macOS/BSD replace with `-v-1H`
