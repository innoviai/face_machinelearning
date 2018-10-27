import * as faceapi from 'face-api.js';
import * as React from 'react';

import { BestMatch } from '../facc/ComputeRefDescriptors';
import { BoxWithText } from 'face-api.js';
import { DisplayResults, ReactElement } from '../../face-api.js-react';
import { MediaElement } from '../../face-api.js-react/MediaElement';


export interface DisplayMatchesProps {
  fullFaceDescriptions: faceapi.FullFaceDescription[]
  input: MediaElement
  overlay: HTMLCanvasElement
  getBestMatch: (queryDescriptor: Float32Array) => BestMatch
  withScore?: boolean
  drawLandmarks?: boolean
  children?: () => ReactElement
}

export const DisplayMatches = (props: DisplayMatchesProps): any => {

  const { input, fullFaceDescriptions, overlay, withScore, getBestMatch } = props

  const boxesWithText = fullFaceDescriptions
    .map(fd => fd.forSize(overlay.width, overlay.height))
    .map(fd => {
      const bestMatch = getBestMatch(fd.descriptor)
      const text = `${bestMatch.distance < 0.6 ? bestMatch.label : 'unknown'} (${faceapi.round(bestMatch.distance)})`
      return new BoxWithText(fd.detection.box, text)
    })

  return (
    <DisplayResults
      input={input}
      results={boxesWithText}
      overlay={overlay}
      displayResultsOptions={{ withScore }}
    >
      { props.children }
    </DisplayResults>
  )
}