import React  from 'react'
// import FAVideo from 'react-icons/lib/esm/iconBase';
// import FAUserPlus from 'react-icons/lib/esm/iconBase';
// import FAEllipsisMenu from 'react-icons/lib/esm/iconBase';


export default function ({name, numberOfUser}) {
        return (
           <div className="chat-header">
               <div className="user-info">
                   <div className="user-name">
                        {name}
                   </div >
                   <div className="status">
                    <div className="indicator"></div>
                    <span>{numberOfUser? numberOfUser: null}</span>
                   </div>
                   {/* <FAVideo />
                   <FAUserPlus />
                   <FAUserPlus /> */}

               </div>

           </div>
        )
    
}
