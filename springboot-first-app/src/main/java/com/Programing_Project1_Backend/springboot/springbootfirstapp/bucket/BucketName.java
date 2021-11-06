package com.Programing_Project1_Backend.springboot.springbootfirstapp.bucket;

public enum BucketName {
    PROFILE_IMAGE("tohoangkhoi-image-upload");
    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
