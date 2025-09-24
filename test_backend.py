#!/usr/bin/env python3
"""
Test script to verify the backend is working correctly
"""
import requests
import json

def test_backend():
    base_url = "http://127.0.0.1:8000"
    
    print("Testing RAG Ollama Backend...")
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        print(f"✅ Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return
    
    # Test question endpoint
    try:
        question_data = {"ques": "What is machine learning?"}
        response = requests.post(f"{base_url}/question/", json=question_data)
        print(f"✅ Question submission: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Question submission failed: {e}")
        return
    
    # Test process endpoint (should fail without files uploaded)
    try:
        response = requests.post(f"{base_url}/process/")
        print(f"ℹ️  Process endpoint (expected to fail): {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"ℹ️  Process endpoint error (expected): {e}")
    
    print("\nBackend test completed!")

if __name__ == "__main__":
    test_backend()
