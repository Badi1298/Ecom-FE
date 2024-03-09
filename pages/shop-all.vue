<template>
    <div>Shop-all</div>
    <button @click="getPosts">Get Posts</button>
    <button @click="createPost">Create Post</button>
</template>

<script setup>
const getPosts = () => {
    fetch('http://localhost:8080/feed/posts')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
};

const createPost = () => {
    fetch('http://localhost:8080/feed/post', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ title: 'aaaaaa', content: 'bbbbbbbb' }),
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
};
</script>
