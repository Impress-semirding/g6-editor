# g6-editor
这是一个拖拽节点的流程编辑器,基于[g6开发](https://github.com/antvis/g6)，api实现参照[g6-editor](https://github.com/antvis/g6-editor)，目前antvis/g6-editor不开源，故而自己撸一个用。
第一版本还在开发中，目前支持itempannel和toolbar。

由于g62.0版本相对于1.0版本很多功能没有实现，先降级，继续迭代，等待2.0版本实现大部分需求，再升级。
目前解决了拖拽偏移问题，左侧拖拽到右侧的容器中自动生成节点。

接下来下来继续支持toolbar功能以及节点上支持dom覆盖可配置选项和交互功能。

cd demos/my-app  
yarn 
npm start

已弃用...
