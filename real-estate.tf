provider "google" {
  project = "splendid-flow-279822"
  region  = "us-central1"
}

data "google_project" "project" {}

data "archive_file" "scraper_zip" {
  type        = "zip"
  source_dir  = "${path.root}/scraper/"
  output_path = "${path.root}/scraper.zip"
}

resource "google_storage_bucket" "bucket" {
  name = "${data.google_project.project.project_id}-real-estate"
}

resource "google_storage_bucket_object" "scraper_zip" {
  name   = "scraper.zip"
  bucket = google_storage_bucket.bucket.name
  source = "${path.root}/scraper.zip"
}

resource "google_pubsub_topic" "trigger" {
  name = "trigger"
}

resource "google_cloudfunctions_function" "scraper_fetch_listing" {
  name        = "scraper-fetch-listing"
  description = "Fetches real-estate property linkslisting"
  runtime     = "nodejs12"
  entry_point = "fetchListing"

  event_trigger {
    event_type = "providers/cloud.pubsub/eventTypes/topic.publish"
    resource   = google_pubsub_topic.trigger.name
  }

  available_memory_mb   = 1024
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.scraper_zip.name
}

resource "google_pubsub_topic" "listing" {
  name = "listing"
}

resource "google_cloudfunctions_function" "scraper_fetch_properties" {
  name        = "scraper-fetch-properties"
  description = "Fetches real-estate properties"
  runtime     = "nodejs12"
  entry_point = "fetchProperties"

  event_trigger {
    event_type = "providers/cloud.pubsub/eventTypes/topic.publish"
    resource   = google_pubsub_topic.listing.name
  }

  available_memory_mb   = 1024
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.scraper_zip.name
}
