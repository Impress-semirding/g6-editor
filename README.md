# g6-editor
这是一个拖拽节点的流程编辑器,基于[g6开发](https://github.com/antvis/g6)，api实现参照[g6-editor](https://github.com/antvis/g6-editor)，目前antvis/g6-editor不开源，故而自己撸一个用。
第一版本还在开发中，目前支持itempannel和toolbar。

由于g62.0版本相对于1.0版本很多功能没有实现，先降级，继续迭代，等待2.0版本实现大部分需求，再升级。

itempannel目前需要点击响应的节点控件，再到canvas面板中点击会自动释放节点到画布中。


cd demos/my-app  
yarn 
npm start  