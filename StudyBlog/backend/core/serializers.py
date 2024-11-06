# core/serializers.py

from rest_framework import serializers
from .models import Post, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    tags = serializers.CharField()

    class Meta:
        model = Post
        fields = ['title', 'content', 'tags']

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        post = Post.objects.create(**validated_data)


        tag_names = [tag_name.strip() for tag_name in tags_data.split(',')]
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_data['name'])
            post.tags.add(tag)
        return post

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags')
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()



        #tag update
        instance.tags.clear()
        tag_names = [tag_name.strip() for tag_name in tags_data.split(',')]
        for tag_name in tag_names:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            instance.tags.add(tag)

        return instance
