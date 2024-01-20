import React, { useState } from "react";

export default function FileDisplay({ fileContents }) {

 const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum orci vel eros feugiat, non rutrum tellus molestie. Praesent varius facilisis arcu id interdum. Integer elementum lacus sed ultricies tristique. Mauris sed dui sed risus bibendum rutrum a quis odio. Fusce aliquet ipsum quis dui congue semper. Proin eu pharetra diam. Suspendisse mattis, sapien eu tempus ullamcorper, tortor neque placerat metus, varius lacinia lectus massa in mauris. In venenatis consectetur mauris sit amet elementum. Maecenas id leo venenatis, euismod metus a, interdum arcu. Donec condimentum auctor mollis. Nunc ullamcorper felis vel libero vehicula, et ultricies odio gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

 Vivamus lacinia augue magna, et molestie ante tristique et. Quisque arcu felis, dapibus eget luctus a, malesuada in libero. In hac habitasse platea dictumst. Donec mi quam, lacinia in tellus vitae, imperdiet consequat orci. Aliquam varius nisi malesuada enim imperdiet bibendum. Aliquam rhoncus ornare risus id faucibus. Etiam nec ipsum sed libero accumsan hendrerit vel vitae sem.
 
 Aliquam faucibus neque eu quam iaculis cursus. Pellentesque ligula diam, tempor tincidunt ex vel, lacinia convallis ex. Integer quam elit, accumsan a euismod in, ultrices ut ipsum. Nam ante leo, molestie a neque et, aliquet ultrices elit. Ut eu augue auctor, ultricies velit vel, feugiat odio. Mauris facilisis convallis elit, et porta sapien feugiat ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit purus nisl, nec elementum sapien lacinia non. Vivamus ex magna, lacinia eget odio eu, feugiat aliquam ante.
 
 Nunc quis venenatis nisl. Maecenas dictum, tellus ut dictum fermentum, turpis purus pharetra sapien, eget pellentesque diam ante non orci. Morbi bibendum imperdiet sem. Sed sit amet lectus dui. Nam sed ultricies ex. Donec tincidunt facilisis lectus non pulvinar. Duis blandit ullamcorper lorem eu aliquam.
 
 Donec placerat purus vel sem gravida tristique ut at metus. Suspendisse potenti. Donec lacinia, lectus quis bibendum posuere, enim mauris consequat nulla, ut ultricies dui est quis erat. Maecenas suscipit in tellus in gravida. Suspendisse vehicula scelerisque arcu, dapibus porttitor tellus. Pellentesque condimentum pharetra metus, a feugiat enim ullamcorper at. In vitae tortor purus. Proin sed ex purus. In congue arcu lorem, sit amet varius mauris rutrum sed.`;
  return (
    <>
        <div className="fileDisplayDiv">
            <div className="fileDisplayOptions">
                <button>x</button>
                <button>x</button>
                <p>filename</p>
            </div>
            <div className="fileDisplayContents"> 
            {fileContents}
            </div>
        </div>
    </>
    
  );
}
