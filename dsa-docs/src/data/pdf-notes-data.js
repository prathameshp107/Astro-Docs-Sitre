/**
 * Complete Catalog of 76 Engineering & DSA Notes (PDFs)
 * Sourced from E:/Coding_Notes/PDFs
 * Supports GitHub Releases / Cloud CDN via PUBLIC_PDF_HOST environment variable
 */

const PDF_HOST = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_PDF_HOST)
  ? import.meta.env.PUBLIC_PDF_HOST.replace(/\/$/, '')
  : '/notes-pdf';

const RAW_NOTES = [
  {
    "id": "system-design-main-concepts",
    "title": "System Design: Main Concepts & Architecture Blueprints",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/System_Design_Main_Concepts/System_Design_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/System_Design_Main_Concepts/System_Design_Main_Concepts.pdf",
    "sizeBytes": 52237838,
    "sizeMB": 49.82,
    "sizeFormatted": "49.82 MB",
    "description": "Comprehensive 50MB architecture bible covering microservices, load balancing, database sharding, CAP theorem, caching tiers, consensus, and fault tolerance.",
    "badge": "High-Yield System Design",
    "color": "#f59e0b",
    "tags": [
      "System Design",
      "HLD",
      "Scalability",
      "Microservices",
      "Distributed Systems"
    ],
    "featured": true
  },
  {
    "id": "dsa-complete-handbook",
    "title": "Complete DSA Master Handbook (All-in-One)",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/00_DSA_Complete_Handbook/DSA_Complete_Handbook.pdf",
    "url": "/notes-pdf/02_DSA/00_DSA_Complete_Handbook/DSA_Complete_Handbook.pdf",
    "sizeBytes": 187585680,
    "sizeMB": 178.9,
    "sizeFormatted": "178.9 MB",
    "description": "The complete, exhaustive 600+ page Master Handbook covering every single data structure, algorithmic pattern, time/space complexity proof, and interview questions.",
    "badge": "600+ Pages Master Handbook",
    "color": "#8b5cf6",
    "tags": [
      "DSA",
      "LeetCode",
      "Algorithms",
      "Data Structures",
      "FAANG"
    ],
    "featured": true
  },
  {
    "id": "llm-questions-handbook",
    "title": "Large Language Models (LLM) Complete Interview Handbook",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/LLM_Questions/LLM_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/LLM_Questions/LLM_Questions.pdf",
    "sizeBytes": 304319648,
    "sizeMB": 290.22,
    "sizeFormatted": "290.22 MB",
    "description": "Exhaustive 290MB visual handbook on LLM architectures, Attention mechanisms, LoRA, quantization, instruction tuning, evaluation, and production deployment.",
    "badge": "290MB Mega Guide",
    "color": "#10b981",
    "tags": [
      "LLM",
      "AI",
      "Transformers",
      "Fine-Tuning",
      "GenAI",
      "Attention"
    ],
    "featured": true
  },
  {
    "id": "api-design-50-questions",
    "title": "API Design: 50 Interview Questions & Best Practices",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/API Design - 50 Interview Questions _ Handbook/API Design - 50 Interview Questions _ Handbook.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/API Design - 50 Interview Questions _ Handbook/API Design - 50 Interview Questions _ Handbook.pdf",
    "sizeBytes": 4782383,
    "sizeMB": 4.56,
    "sizeFormatted": "4.56 MB",
    "description": "50 comprehensive API design questions: rate limiting, versioning, pagination, idempotency keys, OAuth2, and webhook reliability.",
    "badge": "50 Q&A Handbook",
    "color": "#a855f7",
    "tags": [
      "API Design",
      "REST",
      "GraphQL",
      "gRPC",
      "Idempotency",
      "Security"
    ],
    "featured": true
  },
  {
    "id": "backend-300-questions-handbook",
    "title": "Backend Engineering: 300 Interview Questions & Handbook",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/Backend - 300 Interview Questions _ Handbook/Backend - 300 Interview Questions _ Handbook.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/Backend - 300 Interview Questions _ Handbook/Backend - 300 Interview Questions _ Handbook.pdf",
    "sizeBytes": 6092894,
    "sizeMB": 5.81,
    "sizeFormatted": "5.81 MB",
    "description": "300 vetted backend engineering questions covering REST, gRPC, ACID transactions, connection pooling, indexing, caching, and concurrency.",
    "badge": "300 Q&A Handbook",
    "color": "#6366f1",
    "tags": [
      "Backend",
      "APIs",
      "Databases",
      "Concurrency",
      "Node.js",
      "System Design"
    ],
    "featured": true
  },
  {
    "id": "docker-handwritten-handbook",
    "title": "Docker & Containerization Handwritten Study Handbook",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/Docker - Complete Handwritten Study Handbook/Docker - Complete Handwritten Study Handbook.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/Docker - Complete Handwritten Study Handbook/Docker - Complete Handwritten Study Handbook.pdf",
    "sizeBytes": 6442074,
    "sizeMB": 6.14,
    "sizeFormatted": "6.14 MB",
    "description": "Beautiful visual handwritten notes explaining Docker architecture, Dockerfiles, multi-stage builds, networking, volumes, compose, and container orchestration.",
    "badge": "Handwritten Handbook",
    "color": "#0284c7",
    "tags": [
      "Docker",
      "DevOps",
      "Containers",
      "Kubernetes",
      "Cloud"
    ],
    "featured": true
  },
  {
    "id": "react-200-interview-questions",
    "title": "React 200 Interview Questions & Deep Concepts",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/React - 200 Interview Questions/React - 200 Interview Questions.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/React - 200 Interview Questions/React - 200 Interview Questions.pdf",
    "sizeBytes": 6172984,
    "sizeMB": 5.89,
    "sizeFormatted": "5.89 MB",
    "description": "200 visual interview questions covering React 19, reconciliation, Fiber, custom hooks, Server Components, Hydration, and performance optimization.",
    "badge": "200 Q&A Handbook",
    "color": "#06b6d4",
    "tags": [
      "React",
      "Frontend",
      "Hooks",
      "Virtual DOM",
      "State Management"
    ],
    "featured": true
  },
  {
    "id": "sql-300-queries-interview-scenarios",
    "title": "SQL: 300 Queries & Real-World Interview Scenarios",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/SQL - 300 Queries _ Interview Scenarios/SQL - 300 Queries _ Interview Scenarios.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/SQL - 300 Queries _ Interview Scenarios/SQL - 300 Queries _ Interview Scenarios.pdf",
    "sizeBytes": 5762490,
    "sizeMB": 5.5,
    "sizeFormatted": "5.5 MB",
    "description": "300 practical SQL queries, window functions, recursive CTEs, indexing strategies, and tricky FAANG interview data analysis scenarios.",
    "badge": "300 Queries Guide",
    "color": "#f97316",
    "tags": [
      "SQL",
      "Databases",
      "Window Functions",
      "Joins",
      "CTEs",
      "Query Tuning"
    ],
    "featured": true
  },
  {
    "id": "system-design-blinkit-case-study",
    "title": "System Design: Blinkit 10-Minute Delivery Case Study",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/System Design - Blinkit Case Study/System Design - Blinkit Case Study.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/System Design - Blinkit Case Study/System Design - Blinkit Case Study.pdf",
    "sizeBytes": 4100279,
    "sizeMB": 3.91,
    "sizeFormatted": "3.91 MB",
    "description": "Deep dive into 10-minute grocery delivery architecture: dark stores, real-time rider allocation, inventory locks, and distributed routing.",
    "badge": "Real-World Case Study",
    "color": "#eab308",
    "tags": [
      "System Design",
      "Case Study",
      "Blinkit",
      "Quick Commerce",
      "Real-Time"
    ],
    "featured": true
  },
  {
    "id": "system-design-food-delivery-app",
    "title": "System Design: Food Delivery Platform (Zomato / Swiggy)",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/System Design - Food Delivery App/System Design - Food Delivery App.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/System Design - Food Delivery App/System Design - Food Delivery App.pdf",
    "sizeBytes": 8061161,
    "sizeMB": 7.69,
    "sizeFormatted": "7.69 MB",
    "description": "Production architecture of multi-sided food delivery apps: rider matching, surge pricing, order state machine, live GPS tracking, and restaurant dispatch.",
    "badge": "Real-World Case Study",
    "color": "#ef4444",
    "tags": [
      "System Design",
      "Case Study",
      "Food Delivery",
      "Geo-Hashing",
      "WebSockets"
    ],
    "featured": true
  },
  {
    "id": "system-design-whatsapp",
    "title": "System Design: WhatsApp Real-Time Messaging Architecture",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/System Design - WhatsApp/System Design - WhatsApp.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/System Design - WhatsApp/System Design - WhatsApp.pdf",
    "sizeBytes": 4716243,
    "sizeMB": 4.5,
    "sizeFormatted": "4.5 MB",
    "description": "End-to-end design of WhatsApp at 2 billion user scale: Erlang connection managers, message delivery receipts, offline queuing, and multimedia relay.",
    "badge": "Real-World Case Study",
    "color": "#22c55e",
    "tags": [
      "System Design",
      "Case Study",
      "WhatsApp",
      "E2EE",
      "WebSockets",
      "Erlang"
    ],
    "featured": true
  },
  {
    "id": "ai-agents-main-concepts",
    "title": "AI Agents Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/AI_Agents_Main_Concepts/AI_Agents_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/AI_Agents_Main_Concepts/AI_Agents_Main_Concepts.pdf",
    "sizeBytes": 12692742,
    "sizeMB": 12.1,
    "sizeFormatted": "12.1 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of AI Agents Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "AI Agents Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "ai-ml-fundamentals",
    "title": "AI ML Fundamentals",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/AI_ML_Fundamentals/AI_ML_Fundamentals.pdf",
    "url": "/notes-pdf/01_Core_Concepts/AI_ML_Fundamentals/AI_ML_Fundamentals.pdf",
    "sizeBytes": 24318332,
    "sizeMB": 23.19,
    "sizeFormatted": "23.19 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of AI ML Fundamentals.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "AI ML Fundamentals"
    ],
    "featured": false
  },
  {
    "id": "aws-main-concepts",
    "title": "AWS Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/AWS_Main_Concepts/AWS_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/AWS_Main_Concepts/AWS_Main_Concepts.pdf",
    "sizeBytes": 24461114,
    "sizeMB": 23.33,
    "sizeFormatted": "23.33 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of AWS Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "AWS Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "docker-container-fundamentals",
    "title": "Docker Container Fundamentals",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/Docker_Container_Fundamentals/Docker_Container_Fundamentals.pdf",
    "url": "/notes-pdf/01_Core_Concepts/Docker_Container_Fundamentals/Docker_Container_Fundamentals.pdf",
    "sizeBytes": 10297665,
    "sizeMB": 9.82,
    "sizeFormatted": "9.82 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of Docker Container Fundamentals.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "Docker Container Fundamentals"
    ],
    "featured": false
  },
  {
    "id": "github-notes",
    "title": "GitHub Notes",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/GitHub_Notes/GitHub_Notes.pdf",
    "url": "/notes-pdf/01_Core_Concepts/GitHub_Notes/GitHub_Notes.pdf",
    "sizeBytes": 4139240,
    "sizeMB": 3.95,
    "sizeFormatted": "3.95 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of GitHub Notes.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "GitHub Notes"
    ],
    "featured": false
  },
  {
    "id": "javascript-main-concepts",
    "title": "JavaScript Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/JavaScript_Main_Concepts/JavaScript_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/JavaScript_Main_Concepts/JavaScript_Main_Concepts.pdf",
    "sizeBytes": 19606473,
    "sizeMB": 18.7,
    "sizeFormatted": "18.7 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of JavaScript Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "JavaScript Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "kafka-main-concepts",
    "title": "Kafka Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/Kafka_Main_Concepts/Kafka_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/Kafka_Main_Concepts/Kafka_Main_Concepts.pdf",
    "sizeBytes": 14670178,
    "sizeMB": 13.99,
    "sizeFormatted": "13.99 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of Kafka Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "Kafka Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "kubernetes-main-concepts",
    "title": "Kubernetes Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/Kubernetes_Main_Concepts/Kubernetes_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/Kubernetes_Main_Concepts/Kubernetes_Main_Concepts.pdf",
    "sizeBytes": 14360543,
    "sizeMB": 13.7,
    "sizeFormatted": "13.7 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of Kubernetes Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "Kubernetes Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "llm-main-concepts",
    "title": "LLM Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/LLM_Main_Concepts/LLM_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/LLM_Main_Concepts/LLM_Main_Concepts.pdf",
    "sizeBytes": 11702010,
    "sizeMB": 11.16,
    "sizeFormatted": "11.16 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of LLM Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "LLM Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "mlops-main-concepts",
    "title": "MLOps Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/MLOps_Main_Concepts/MLOps_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/MLOps_Main_Concepts/MLOps_Main_Concepts.pdf",
    "sizeBytes": 13603310,
    "sizeMB": 12.97,
    "sizeFormatted": "12.97 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of MLOps Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "MLOps Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "nextjs-main-concepts",
    "title": "NextJS Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NextJS_Main_Concepts/NextJS_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NextJS_Main_Concepts/NextJS_Main_Concepts.pdf",
    "sizeBytes": 11461210,
    "sizeMB": 10.93,
    "sizeFormatted": "10.93 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of NextJS Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "NextJS Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-04-auth-security",
    "title": "Node.js Chapter: auth security",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/04_auth_security/04_auth_security.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/04_auth_security/04_auth_security.pdf",
    "sizeBytes": 1847407,
    "sizeMB": 1.76,
    "sizeFormatted": "1.76 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of auth security.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-03-databases-apis",
    "title": "Node.js Chapter: databases apis",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/03_databases_apis/03_databases_apis.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/03_databases_apis/03_databases_apis.pdf",
    "sizeBytes": 2515402,
    "sizeMB": 2.4,
    "sizeFormatted": "2.4 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of databases apis.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-01-foundations",
    "title": "Node.js Chapter: foundations",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/01_foundations/01_foundations.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/01_foundations/01_foundations.pdf",
    "sizeBytes": 2753720,
    "sizeMB": 2.63,
    "sizeFormatted": "2.63 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of foundations.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-02-http-express",
    "title": "Node.js Chapter: http express",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/02_http_express/02_http_express.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/02_http_express/02_http_express.pdf",
    "sizeBytes": 2472606,
    "sizeMB": 2.36,
    "sizeFormatted": "2.36 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of http express.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-06-performance-scalability",
    "title": "Node.js Chapter: performance scalability",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/06_performance_scalability/06_performance_scalability.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/06_performance_scalability/06_performance_scalability.pdf",
    "sizeBytes": 2685917,
    "sizeMB": 2.56,
    "sizeFormatted": "2.56 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of performance scalability.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-07-production-operations",
    "title": "Node.js Chapter: production operations",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/07_production_operations/07_production_operations.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/07_production_operations/07_production_operations.pdf",
    "sizeBytes": 2938388,
    "sizeMB": 2.8,
    "sizeFormatted": "2.8 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of production operations.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-08-system-design-architecture",
    "title": "Node.js Chapter: system design architecture",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/08_system_design_architecture/08_system_design_architecture.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/08_system_design_architecture/08_system_design_architecture.pdf",
    "sizeBytes": 3038728,
    "sizeMB": 2.9,
    "sizeFormatted": "2.9 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of system design architecture.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-chapter-05-testing-debugging",
    "title": "Node.js Chapter: testing debugging",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/chapters/05_testing_debugging/05_testing_debugging.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/chapters/05_testing_debugging/05_testing_debugging.pdf",
    "sizeBytes": 2548105,
    "sizeMB": 2.43,
    "sizeFormatted": "2.43 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of testing debugging.",
    "badge": "Node.js Deep Dive",
    "color": "#3b82f6",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript"
    ],
    "featured": false
  },
  {
    "id": "nodejs-concept-notes",
    "title": "NodeJS Concept Notes",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/NodeJS_Concept_Notes/NodeJS_Concept_Notes.pdf",
    "url": "/notes-pdf/01_Core_Concepts/NodeJS_Concept_Notes/NodeJS_Concept_Notes.pdf",
    "sizeBytes": 20797542,
    "sizeMB": 19.83,
    "sizeFormatted": "19.83 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of NodeJS Concept Notes.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "NodeJS Concept Notes"
    ],
    "featured": false
  },
  {
    "id": "rag-main-concepts",
    "title": "RAG Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/RAG_Main_Concepts/RAG_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/RAG_Main_Concepts/RAG_Main_Concepts.pdf",
    "sizeBytes": 10972623,
    "sizeMB": 10.46,
    "sizeFormatted": "10.46 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of RAG Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "RAG Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "react-main-concepts",
    "title": "React Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/React_Main_Concepts/React_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/React_Main_Concepts/React_Main_Concepts.pdf",
    "sizeBytes": 19908382,
    "sizeMB": 18.99,
    "sizeFormatted": "18.99 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of React Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "React Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "redis-main-concepts",
    "title": "Redis Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/Redis_Main_Concepts/Redis_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/Redis_Main_Concepts/Redis_Main_Concepts.pdf",
    "sizeBytes": 13982026,
    "sizeMB": 13.33,
    "sizeFormatted": "13.33 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of Redis Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "Redis Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "terraform-infrastructure-as-code",
    "title": "Terraform Infrastructure as Code",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/Terraform_Infrastructure_as_Code/Terraform_Infrastructure_as_Code.pdf",
    "url": "/notes-pdf/01_Core_Concepts/Terraform_Infrastructure_as_Code/Terraform_Infrastructure_as_Code.pdf",
    "sizeBytes": 10413801,
    "sizeMB": 9.93,
    "sizeFormatted": "9.93 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of Terraform Infrastructure as Code.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "Terraform Infrastructure as Code"
    ],
    "featured": false
  },
  {
    "id": "typescript-main-concepts",
    "title": "TypeScript Main Concepts",
    "category": "core-concepts",
    "categoryLabel": "Core Concepts",
    "relPath": "01_Core_Concepts/TypeScript_Main_Concepts/TypeScript_Main_Concepts.pdf",
    "url": "/notes-pdf/01_Core_Concepts/TypeScript_Main_Concepts/TypeScript_Main_Concepts.pdf",
    "sizeBytes": 17722624,
    "sizeMB": 16.9,
    "sizeFormatted": "16.9 MB",
    "description": "Comprehensive concept notes, architecture diagrams, and internal mechanics of TypeScript Main Concepts.",
    "badge": "Core Engineering",
    "color": "#3b82f6",
    "tags": [
      "Core Concepts",
      "TypeScript Main Concepts"
    ],
    "featured": false
  },
  {
    "id": "21-advanced-dsa-interview-patterns",
    "title": "Advanced DSA Interview Patterns",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/21_Advanced_DSA_Interview_Patterns/21_Advanced_DSA_Interview_Patterns.pdf",
    "url": "/notes-pdf/02_DSA/21_Advanced_DSA_Interview_Patterns/21_Advanced_DSA_Interview_Patterns.pdf",
    "sizeBytes": 9260425,
    "sizeMB": 8.83,
    "sizeFormatted": "8.83 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Advanced DSA Interview Patterns.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Advanced DSA Interview Patterns",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "17-advanced-graph-algorithms",
    "title": "Advanced Graph Algorithms",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/17_Advanced_Graph_Algorithms/17_Advanced_Graph_Algorithms.pdf",
    "url": "/notes-pdf/02_DSA/17_Advanced_Graph_Algorithms/17_Advanced_Graph_Algorithms.pdf",
    "sizeBytes": 9425985,
    "sizeMB": 8.99,
    "sizeFormatted": "8.99 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Advanced Graph Algorithms.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Advanced Graph Algorithms",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "20-advanced-string-algorithms",
    "title": "Advanced String Algorithms",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/20_Advanced_String_Algorithms/20_Advanced_String_Algorithms.pdf",
    "url": "/notes-pdf/02_DSA/20_Advanced_String_Algorithms/20_Advanced_String_Algorithms.pdf",
    "sizeBytes": 9264663,
    "sizeMB": 8.84,
    "sizeFormatted": "8.84 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Advanced String Algorithms.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Advanced String Algorithms",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "01-arrays",
    "title": "Arrays",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/01_Arrays/01_Arrays.pdf",
    "url": "/notes-pdf/02_DSA/01_Arrays/01_Arrays.pdf",
    "sizeBytes": 6338243,
    "sizeMB": 6.04,
    "sizeFormatted": "6.04 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Arrays.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Arrays",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "15-bit-manipulation",
    "title": "Bit Manipulation",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/15_Bit_Manipulation/15_Bit_Manipulation.pdf",
    "url": "/notes-pdf/02_DSA/15_Bit_Manipulation/15_Bit_Manipulation.pdf",
    "sizeBytes": 9092664,
    "sizeMB": 8.67,
    "sizeFormatted": "8.67 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Bit Manipulation.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Bit Manipulation",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "09-dynamic-programming",
    "title": "Dynamic Programming",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/09_Dynamic_Programming/09_Dynamic_Programming.pdf",
    "url": "/notes-pdf/02_DSA/09_Dynamic_Programming/09_Dynamic_Programming.pdf",
    "sizeBytes": 9246626,
    "sizeMB": 8.82,
    "sizeFormatted": "8.82 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Dynamic Programming.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Dynamic Programming",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "19-fenwick-trees",
    "title": "Fenwick Trees",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/19_Fenwick_Trees/19_Fenwick_Trees.pdf",
    "url": "/notes-pdf/02_DSA/19_Fenwick_Trees/19_Fenwick_Trees.pdf",
    "sizeBytes": 6234029,
    "sizeMB": 5.95,
    "sizeFormatted": "5.95 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Fenwick Trees.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Fenwick Trees",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "08-graphs",
    "title": "Graphs",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/08_Graphs/08_Graphs.pdf",
    "url": "/notes-pdf/02_DSA/08_Graphs/08_Graphs.pdf",
    "sizeBytes": 9340863,
    "sizeMB": 8.91,
    "sizeFormatted": "8.91 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Graphs.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Graphs",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "10-greedy-algorithms",
    "title": "Greedy Algorithms",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/10_Greedy_Algorithms/10_Greedy_Algorithms.pdf",
    "url": "/notes-pdf/02_DSA/10_Greedy_Algorithms/10_Greedy_Algorithms.pdf",
    "sizeBytes": 9686590,
    "sizeMB": 9.24,
    "sizeFormatted": "9.24 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Greedy Algorithms.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Greedy Algorithms",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "05-hashing-hashmaps",
    "title": "Hashing HashMaps",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/05_Hashing_HashMaps/05_Hashing_HashMaps.pdf",
    "url": "/notes-pdf/02_DSA/05_Hashing_HashMaps/05_Hashing_HashMaps.pdf",
    "sizeBytes": 9778327,
    "sizeMB": 9.33,
    "sizeFormatted": "9.33 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Hashing HashMaps.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Hashing HashMaps",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "13-heaps-priority-queues",
    "title": "Heaps Priority Queues",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/13_Heaps_Priority_Queues/13_Heaps_Priority_Queues.pdf",
    "url": "/notes-pdf/02_DSA/13_Heaps_Priority_Queues/13_Heaps_Priority_Queues.pdf",
    "sizeBytes": 9406392,
    "sizeMB": 8.97,
    "sizeFormatted": "8.97 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Heaps Priority Queues.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Heaps Priority Queues",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "03-linked-lists",
    "title": "Linked Lists",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/03_Linked_Lists/03_Linked_Lists.pdf",
    "url": "/notes-pdf/02_DSA/03_Linked_Lists/03_Linked_Lists.pdf",
    "sizeBytes": 9271791,
    "sizeMB": 8.84,
    "sizeFormatted": "8.84 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Linked Lists.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Linked Lists",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "16-mathematics-number-theory",
    "title": "Mathematics Number Theory",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/16_Mathematics_Number_Theory/16_Mathematics_Number_Theory.pdf",
    "url": "/notes-pdf/02_DSA/16_Mathematics_Number_Theory/16_Mathematics_Number_Theory.pdf",
    "sizeBytes": 9222391,
    "sizeMB": 8.8,
    "sizeFormatted": "8.8 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Mathematics Number Theory.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Mathematics Number Theory",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "06-recursion-backtracking",
    "title": "Recursion Backtracking",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/06_Recursion_Backtracking/06_Recursion_Backtracking.pdf",
    "url": "/notes-pdf/02_DSA/06_Recursion_Backtracking/06_Recursion_Backtracking.pdf",
    "sizeBytes": 9723982,
    "sizeMB": 9.27,
    "sizeFormatted": "9.27 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Recursion Backtracking.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Recursion Backtracking",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "12-searching-binary-search",
    "title": "Searching Binary Search",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/12_Searching_Binary_Search/12_Searching_Binary_Search.pdf",
    "url": "/notes-pdf/02_DSA/12_Searching_Binary_Search/12_Searching_Binary_Search.pdf",
    "sizeBytes": 9149142,
    "sizeMB": 8.73,
    "sizeFormatted": "8.73 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Searching Binary Search.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Searching Binary Search",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "18-segment-trees",
    "title": "Segment Trees",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/18_Segment_Trees/18_Segment_Trees.pdf",
    "url": "/notes-pdf/02_DSA/18_Segment_Trees/18_Segment_Trees.pdf",
    "sizeBytes": 9320229,
    "sizeMB": 8.89,
    "sizeFormatted": "8.89 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Segment Trees.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Segment Trees",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "11-sorting-algorithms",
    "title": "Sorting Algorithms",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/11_Sorting_Algorithms/11_Sorting_Algorithms.pdf",
    "url": "/notes-pdf/02_DSA/11_Sorting_Algorithms/11_Sorting_Algorithms.pdf",
    "sizeBytes": 9706394,
    "sizeMB": 9.26,
    "sizeFormatted": "9.26 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Sorting Algorithms.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Sorting Algorithms",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "04-stacks-queues",
    "title": "Stacks Queues",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/04_Stacks_Queues/04_Stacks_Queues.pdf",
    "url": "/notes-pdf/02_DSA/04_Stacks_Queues/04_Stacks_Queues.pdf",
    "sizeBytes": 9407974,
    "sizeMB": 8.97,
    "sizeFormatted": "8.97 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Stacks Queues.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Stacks Queues",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "02-strings",
    "title": "Strings",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/02_Strings/02_Strings.pdf",
    "url": "/notes-pdf/02_DSA/02_Strings/02_Strings.pdf",
    "sizeBytes": 6397663,
    "sizeMB": 6.1,
    "sizeFormatted": "6.1 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Strings.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Strings",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "07-trees",
    "title": "Trees",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/07_Trees/07_Trees.pdf",
    "url": "/notes-pdf/02_DSA/07_Trees/07_Trees.pdf",
    "sizeBytes": 9153504,
    "sizeMB": 8.73,
    "sizeFormatted": "8.73 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Trees.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Trees",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "14-tries",
    "title": "Tries",
    "category": "dsa",
    "categoryLabel": "DSA Master Series",
    "relPath": "02_DSA/14_Tries/14_Tries.pdf",
    "url": "/notes-pdf/02_DSA/14_Tries/14_Tries.pdf",
    "sizeBytes": 9159962,
    "sizeMB": 8.74,
    "sizeFormatted": "8.74 MB",
    "description": "Visual explanations, edge cases, step-by-step algorithms, and standard interview problems for Tries.",
    "badge": "DSA Module",
    "color": "#6366f1",
    "tags": [
      "DSA",
      "Tries",
      "Algorithms",
      "Data Structures"
    ],
    "featured": false
  },
  {
    "id": "ai-agents-questions",
    "title": "Ai Agents Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/Ai_Agents_Questions/Ai_Agents_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/Ai_Agents_Questions/Ai_Agents_Questions.pdf",
    "sizeBytes": 14002414,
    "sizeMB": 13.35,
    "sizeFormatted": "13.35 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for Ai Agents Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "Ai Agents Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "ai-questions",
    "title": "AI Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/AI_Questions/AI_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/AI_Questions/AI_Questions.pdf",
    "sizeBytes": 13757224,
    "sizeMB": 13.12,
    "sizeFormatted": "13.12 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for AI Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "AI Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "angular-notebook-pages",
    "title": "angular notebook pages",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/angular_notebook_pages/angular_notebook_pages.pdf",
    "url": "/notes-pdf/03_Interview_Questions/angular_notebook_pages/angular_notebook_pages.pdf",
    "sizeBytes": 13703645,
    "sizeMB": 13.07,
    "sizeFormatted": "13.07 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for angular notebook pages.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "angular notebook pages",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "deep-ml-questions",
    "title": "Deep ML Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/Deep ML Questions/Deep ML Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/Deep ML Questions/Deep ML Questions.pdf",
    "sizeBytes": 7599973,
    "sizeMB": 7.25,
    "sizeFormatted": "7.25 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for Deep ML Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "Deep ML Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "gen-ai-questions",
    "title": "Gen AI Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/Gen_AI_ Questions/Gen_AI_ Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/Gen_AI_ Questions/Gen_AI_ Questions.pdf",
    "sizeBytes": 14870015,
    "sizeMB": 14.18,
    "sizeFormatted": "14.18 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for Gen AI Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "Gen AI Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "javascript-questions",
    "title": "JavaScript Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/JavaScript Questions/JavaScript Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/JavaScript Questions/JavaScript Questions.pdf",
    "sizeBytes": 13469822,
    "sizeMB": 12.85,
    "sizeFormatted": "12.85 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for JavaScript Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "JavaScript Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "ml-questions",
    "title": "ML Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/ML_Questions/ML_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/ML_Questions/ML_Questions.pdf",
    "sizeBytes": 147020201,
    "sizeMB": 140.21,
    "sizeFormatted": "140.21 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for ML Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "ML Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "nodejs-questions",
    "title": "NodeJs Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/NodeJs_Questions/NodeJs_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/NodeJs_Questions/NodeJs_Questions.pdf",
    "sizeBytes": 152206343,
    "sizeMB": 145.16,
    "sizeFormatted": "145.16 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for NodeJs Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "NodeJs Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "python-questions",
    "title": "Python Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/Python_Questions/Python_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/Python_Questions/Python_Questions.pdf",
    "sizeBytes": 13674225,
    "sizeMB": 13.04,
    "sizeFormatted": "13.04 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for Python Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "Python Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "rag-questions",
    "title": "RAG Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/RAG_Questions/RAG_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/RAG_Questions/RAG_Questions.pdf",
    "sizeBytes": 155232220,
    "sizeMB": 148.04,
    "sizeFormatted": "148.04 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for RAG Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "RAG Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "react-questions",
    "title": "React Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/React_Questions/React_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/React_Questions/React_Questions.pdf",
    "sizeBytes": 152708928,
    "sizeMB": 145.63,
    "sizeFormatted": "145.63 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for React Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "React Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "sql-database-questions",
    "title": "SQL Database Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/SQL_Database_Questions/SQL_Database_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/SQL_Database_Questions/SQL_Database_Questions.pdf",
    "sizeBytes": 25232341,
    "sizeMB": 24.06,
    "sizeFormatted": "24.06 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for SQL Database Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "SQL Database Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "system-design-questions",
    "title": "System Design Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/System_Design_Questions/System_Design_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/System_Design_Questions/System_Design_Questions.pdf",
    "sizeBytes": 17942733,
    "sizeMB": 17.11,
    "sizeFormatted": "17.11 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for System Design Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "System Design Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "typescript-questions",
    "title": "TypeScript Questions",
    "category": "interview-questions",
    "categoryLabel": "Interview Q&A",
    "relPath": "03_Interview_Questions/TypeScript_Questions/TypeScript_Questions.pdf",
    "url": "/notes-pdf/03_Interview_Questions/TypeScript_Questions/TypeScript_Questions.pdf",
    "sizeBytes": 14075607,
    "sizeMB": 13.42,
    "sizeFormatted": "13.42 MB",
    "description": "Curated interview questions with deep architectural answers and code implementations for TypeScript Questions.",
    "badge": "Interview Q&A",
    "color": "#14b8a6",
    "tags": [
      "Interview Prep",
      "TypeScript Questions",
      "Q&A"
    ],
    "featured": false
  },
  {
    "id": "artificial-intelligence-interview-questions",
    "title": "Artificial Intelligence - Interview Questions",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/Artificial Intelligence - Interview Questions/Artificial Intelligence - Interview Questions.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/Artificial Intelligence - Interview Questions/Artificial Intelligence - Interview Questions.pdf",
    "sizeBytes": 5527194,
    "sizeMB": 5.27,
    "sizeFormatted": "5.27 MB",
    "description": "High-yield engineering study handbook and interview preparation notes.",
    "badge": "Study Guide",
    "color": "#3b82f6",
    "tags": [],
    "featured": false
  },
  {
    "id": "machine-learning-complete-notes-guide",
    "title": "Machine Learning - Complete Notes Guide",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/Machine Learning - Complete Notes _ Guide/Machine Learning - Complete Notes _ Guide.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/Machine Learning - Complete Notes _ Guide/Machine Learning - Complete Notes _ Guide.pdf",
    "sizeBytes": 6219006,
    "sizeMB": 5.93,
    "sizeFormatted": "5.93 MB",
    "description": "High-yield engineering study handbook and interview preparation notes.",
    "badge": "Study Guide",
    "color": "#3b82f6",
    "tags": [],
    "featured": false
  },
  {
    "id": "oops-concepts-real-life-examples",
    "title": "Object-Oriented Programming: Real-Life Visual Examples",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/OOPs - Concepts with Real Life Examples/OOPs - Concepts with Real Life Examples.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/OOPs - Concepts with Real Life Examples/OOPs - Concepts with Real Life Examples.pdf",
    "sizeBytes": 1874731,
    "sizeMB": 1.79,
    "sizeFormatted": "1.79 MB",
    "description": "Real-world analogies and visual explanations for Encapsulation, Abstraction, Inheritance, Polymorphism, and SOLID principles.",
    "badge": "Visual Handbook",
    "color": "#ec4899",
    "tags": [
      "OOP",
      "LLD",
      "Design Patterns",
      "Polymorphism",
      "SOLID"
    ],
    "featured": false
  },
  {
    "id": "python-interview-questions-answers",
    "title": "Python - Interview Questions Answers",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/Python - Interview Questions _ Answers/Python - Interview Questions _ Answers.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/Python - Interview Questions _ Answers/Python - Interview Questions _ Answers.pdf",
    "sizeBytes": 5755020,
    "sizeMB": 5.49,
    "sizeFormatted": "5.49 MB",
    "description": "High-yield engineering study handbook and interview preparation notes.",
    "badge": "Study Guide",
    "color": "#3b82f6",
    "tags": [],
    "featured": false
  },
  {
    "id": "system-design-300-interview-questions-answers",
    "title": "System Design - 300 Interview Questions Answers",
    "category": "case-studies",
    "categoryLabel": "Visual Handbooks & Case Studies",
    "relPath": "04_Visual_Handbooks_and_Case_Studies/System Design - 300 Interview Questions _ Answers/System Design - 300 Interview Questions _ Answers.pdf",
    "url": "/notes-pdf/04_Visual_Handbooks_and_Case_Studies/System Design - 300 Interview Questions _ Answers/System Design - 300 Interview Questions _ Answers.pdf",
    "sizeBytes": 7785103,
    "sizeMB": 7.42,
    "sizeFormatted": "7.42 MB",
    "description": "High-yield engineering study handbook and interview preparation notes.",
    "badge": "Study Guide",
    "color": "#3b82f6",
    "tags": [],
    "featured": false
  }
];

export const PDF_NOTES = RAW_NOTES.map(note => {
  const isRemoteHost = PDF_HOST.startsWith('http');
  const targetPath = isRemoteHost ? encodeURIComponent(note.fileName) : note.relPath;
  return {
    ...note,
    url: `${PDF_HOST}/${targetPath}`
  };
});

export const PDF_CATEGORIES = [
  { id: "all", label: "All Notes", count: 76 },
  { id: "core-concepts", label: "Core Concepts", count: 26 },
  { id: "dsa", label: "DSA Master Series", count: 22 },
  { id: "interview-questions", label: "Interview Q&A", count: 15 },
  { id: "case-studies", label: "Visual Handbooks & Case Studies", count: 13 }
];
