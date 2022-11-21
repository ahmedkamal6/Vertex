import React,{useState,useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import Client from '../Client'
import {feedQuery,searchQuery} from '../Utils/data'
import Spinner from './Spinner'
function Search(props) {
const [pins, setPins] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(()=>{
  if(props.searchTerm){
    setLoading(true)
    const query = searchQuery(props.searchTerm.toLowerCase())
    Client.fetch(query).then(data => {
      setPins(data)
      setLoading(false)
    })
  }else{
    Client.fetch(feedQuery).then(data => {
      setPins(data)
      setLoading(false)
    })
  }
},[props.searchTerm])
  return (
    <div>
      {loading && <Spinner message='searching for pins'/>}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length == 0 && props.searchTerm !== ' ' && !loading &&(
        <div className='mt-10 text-center text-xl'>No Pins Found!!!</div>
      )}
    </div>
  )
}

export default Search
