package main

import (
	"os"

	"ganigeorgiev.com/pocketbase/pocketbase/core"
)

// configureS3 enables S3 file storage when CIVICTOOLS_S3_* env vars are present;
// otherwise PocketBase keeps using local pb_data storage.
func configureS3(app core.App) error {
	access := os.Getenv("CIVICTOOLS_S3_ACCESS_KEY")
	secret := os.Getenv("CIVICTOOLS_S3_SECRET_KEY")
	bucket := os.Getenv("CIVICTOOLS_S3_BUCKET")
	endpoint := os.Getenv("CIVICTOOLS_S3_ENDPOINT")
	if access == "" || secret == "" || bucket == "" || endpoint == "" {
		return nil
	}
	region := os.Getenv("CIVICTOOLS_S3_REGION")
	if region == "" {
		region = "us-east-1"
	}

	s := app.Settings()
	c := s.S3
	if c.Enabled && c.Bucket == bucket && c.Endpoint == endpoint && c.Region == region &&
		c.AccessKey == access && c.Secret == secret && c.ForcePathStyle {
		return nil
	}
	s.S3.Enabled = true
	s.S3.Bucket = bucket
	s.S3.Region = region
	s.S3.Endpoint = endpoint
	s.S3.AccessKey = access
	s.S3.Secret = secret
	s.S3.ForcePathStyle = true
	return app.Save(s)
}
