'use strict'

var net = require('net')
let config = {
  port: 8885,
  address: '192.168.1.242'
}
var client = new net.Socket()
var data = ''
var buffer = new Buffer(0, 'hex')
var Struct = require('struct').Struct

var bodyFrame = new Struct()
    .word32Sle('isTracked')
    .word32Sle('seatedSkeleton')
    .word32Sle('clipped_left')
    .word32Sle('clipped_right')     // 0 or 1 for instance
    .word32Sle('clipped_top')
    .word32Sle('clipped_bottom')
    .doublele('timeStamp')
    .floatle('grip_left')
    .floatle('grip_right')
    
    .floatle('conf_waist')
    .floatle('conf_spine')
    .floatle('conf_neck')
    .floatle('conf_head')
    .floatle('conf_upperLeg_L')
    .floatle('conf_lowerLeg_L')
    .floatle('conf_foot_L')
    .floatle('conf_toes_L')
    .floatle('conf_upperLeg_R')
    .floatle('conf_lowerLeg_R')
    .floatle('conf_foot_R')
    .floatle('conf_toes_R')
    .floatle('conf_collar_L')
    .floatle('conf_upperArm_L')
    .floatle('conf_foreArm_L')
    .floatle('conf_hand_L')
    .floatle('conf_fingers_L')
    .floatle('conf_collar_R')
    .floatle('conf_upperArm_R')
    .floatle('conf_foreArm_R')
    .floatle('conf_hand_R')
    .floatle('conf_fingers_R')
    
    .array('conf_thumb_L', 4, 'floatle')
    .array('conf_index_L', 4, 'floatle')
    .array('conf_middle_L', 4, 'floatle')
    .array('conf_ring_L', 4, 'floatle')
    .array('conf_pinky_L', 4, 'floatle')
    .array('conf_thumb_R', 4, 'floatle')
    .array('conf_index_R', 4, 'floatle')
    .array('conf_middle_R', 4, 'floatle')
    .array('conf_ring_R', 4, 'floatle')
    .array('conf_pinky_R', 4, 'floatle')
    
    .array('pos_waist', 3, 'floatle')
    .array('pos_spine', 3, 'floatle')
    .array('pos_neck', 3, 'floatle')
    .array('pos_head', 3, 'floatle')
    .array('pos_upperLeg_L', 3, 'floatle')
    .array('pos_lowerLeg_L', 3, 'floatle')
    .array('pos_foot_L', 3, 'floatle')
    .array('pos_toes_L', 3, 'floatle')
    .array('pos_upperLeg_R', 3, 'floatle')
    .array('pos_lowerLeg_R', 3, 'floatle')
    .array('pos_foot_R', 3, 'floatle')
    .array('pos_toes_R', 3, 'floatle')
    .array('pos_collar_L', 3, 'floatle')
    .array('pos_upperArm_L', 3, 'floatle')
    .array('pos_foreArm_L', 3, 'floatle')
    .array('pos_hand_L', 3, 'floatle')
    .array('pos_fingers_L', 3, 'floatle')
    .array('pos_collar_R', 3, 'floatle')
    .array('pos_upperArm_R', 3, 'floatle')
    .array('pos_foreArm_R', 3, 'floatle')
    .array('pos_hand_R', 3, 'floatle')
    .array('pos_fingers_R', 3, 'floatle')
    
    .array('pos_thumb_L', 3, 'floatle', 4)
    .array('pos_index_L', 3, 'floatle', 4)
    .array('pos_middle_L', 3, 'floatle', 4)
    .array('pos_ring_L', 3, 'floatle', 4)
    .array('pos_pinky_L', 3, 'floatle', 4)
    .array('pos_thumb_R', 3, 'floatle', 4)
    .array('pos_index_R', 3, 'floatle', 4)
    .array('pos_middle_R', 3, 'floatle', 4)
    .array('pos_ring_R', 3, 'floatle', 4)
    .array('pos_pinky_R', 3, 'floatle', 4)
    
    .array('rot_waist', 3, 'floatle')
    .array('rot_spine', 3, 'floatle')
    .array('rot_neck', 3, 'floatle')
    .array('rot_head', 3, 'floatle')
    .array('rot_upperLeg_L', 3, 'floatle')
    .array('rot_lowerLeg_L', 3, 'floatle')
    .array('rot_foot_L', 3, 'floatle')
    .array('rot_toes_L', 3, 'floatle')
    .array('rot_upperLeg_R', 3, 'floatle')
    .array('rot_lowerLeg_R', 3, 'floatle')
    .array('rot_foot_R', 3, 'floatle')
    .array('rot_toes_R', 3, 'floatle')
    .array('rot_collar_L', 3, 'floatle')
    .array('rot_upperArm_L', 3, 'floatle')
    .array('rot_foreArm_L', 3, 'floatle')
    .array('rot_hand_L', 3, 'floatle')
    .array('rot_fingers_L', 3, 'floatle')
    .array('rot_collar_R', 3, 'floatle')
    .array('rot_upperArm_R', 3, 'floatle')
    .array('rot_foreArm_R', 3, 'floatle')
    .array('rot_hand_R', 3, 'floatle')
    .array('rot_fingers_R', 3, 'floatle')
    
    .array('rot_thumb_L', 3, 'floatle', 4)
    .array('rot_index_L', 3, 'floatle', 4)
    .array('rot_middle_L', 3, 'floatle', 4)
    .array('rot_ring_L', 3, 'floatle', 4)
    .array('rot_pinky_L', 3, 'floatle', 4)
    .array('rot_thumb_R', 3, 'floatle', 4)
    .array('rot_index_R', 3, 'floatle', 4)
    .array('rot_middle_R', 3, 'floatle', 4)
    .array('rot_ring_R', 3, 'floatle', 4)
    .array('rot_pinky_R', 3, 'floatle', 4)
    
 
  var frame = Struct()
  .word8('start')
  .word8('length')
  .word8('begin')
  .array('list', 2, bodyFrame)
  .word32Sle('mNumPeopleSeen')
  .array('bodyPositions', 3, 'floatle', 6)

console.log('packet size: ', frame.length())

var makeAndParsePersonFromBinary = function(buffer) {
  
  
  var frameBuffer = new Buffer(frame.length())
  frameBuffer.fill(0)
  
  frame.setBuffer(buffer)
  
  return frame
}

client.connect(config.port, config.address, function onConnect() {
  console.log(`Connected to ${config.address}:${config.port}`)
})

client.on('data', function onData(chunk) {
  buffer = Buffer.concat([buffer, new Buffer(chunk, 'hex')])
  //data += chunk
  //search for separator
  console.log(buffer.length)
  //console.log('data: ', data)
})

client.on('error', function onError(data) {
  console.log(`error occured: ${data}`)
})

client.on('close', function onClose() {
  console.log('Connection closed')
})