#!/usr/bin/env bash
set -e

# Configuration
SERVICE_NAME="crewops-occ"
REGION="asia-south1"

echo "=========================================================="
echo "  Deploying CrewOps to Google Cloud Run"
echo "  Region: ${REGION}"
echo "=========================================================="

# Check for gcloud CLI
if ! command -v gcloud &> /dev/null; then
    echo "Error: gcloud command-line tool is not installed."
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

PROJECT_ID=$(gcloud config get-value project 2> /dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "Error: No active Google Cloud project selected."
    echo "Run: gcloud config set project <YOUR_PROJECT_ID>"
    exit 1
fi

echo "Deploying on project: ${PROJECT_ID}..."

gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --region "${REGION}" \
  --platform managed \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --set-env-vars "GOOGLE_CLOUD_PROJECT=${PROJECT_ID}"

echo "=========================================================="
echo "  Deployment Complete!"
echo "=========================================================="
