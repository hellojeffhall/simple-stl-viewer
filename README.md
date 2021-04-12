# Simple STL Viewer

**[Demo: Try it out!](https://simple-stl-viewer-demo.netlify.app)**  (The STL may take a while to load)

This library tries to make it as easy as possible to set up an STL viewer on your website. You don't need to know how to use JavaScript to use this library; if you know a little HTML (or know how to copy/paste it) then you can use this library.

To keep things as simple as possible, customization options are very limited for now. New options may be added over time.

# Usage

(See the [live demo](https://simple-stl-viewer-demo.netlify.app) for a fully coded example.)

## Setting up your HTML
To use this library, in your HTML, you will need to create a "placeholder" `<div>` for each STL viewer that you want to render. The placeholder should look like this:
```HTML
<div data-stl-url='path/to/your/file.stl'></div>
```
If you want to specify a hex color for your STL object, you can do so with the `color` property.
```HTML
<div color="#5A7A7C" data-stl-url='path/to/your/file.stl'></div>
```
(Make sure your hex color starts with a `#`!)

## Importing the script
Then, anywhere **below** all your STL viewier placeholder divs, you should add the script tag that loads this library. When the library loads, it will transform your placeholders into STL viewers.
```HTML
<script src="https://cdn.jsdelivr.net/gh/hellojeffhall/simple-stl-viewer@main/dist/simple-stl-viewer.min.js"></script>
```
(**NOTE** that in production, you probably want to self host this JavaScript file since it could change in the future.)

## Setting the size of the STL viewer
You will also need to set a size for the viewer. You can do this by using CSS to select items with the `data-stl-url` property and set their height and width.
```CSS
[data-stl-url] {
	height: 500px;
	width: 750px;
}
```

# Attribution
This library is built with [Three.js](https://threejs.org/docs/) and is essentially a repackaging of [this STL viewier by Anthony Biondo](https://tonybox.net/posts/simple-stl-viewer/). The original is very nice, especailly if you are a developer and want to tweak settings, but I also know there are non-developers who just want an easy way to copy/paste an STL viewer into their website.