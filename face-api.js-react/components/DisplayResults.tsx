import { BoxWithText, FaceDetection, FaceDetectionWithLandmarks, FaceLandmarks68 } from 'face-api.js';
import { MediaElement, shallowEquals } from 'face-api.js-react';
import * as React from 'react';

import { displayResults, DisplayResultsOptions } from '../displayResults';
import { ReactElement } from '../types';

export type DisplayResultsProps = {
  input: MediaElement
  overlay: HTMLCanvasElement
  results?: Array<FaceDetection | FaceLandmarks68 | FaceDetectionWithLandmarks | BoxWithText>
  displayResultsOptions?: DisplayResultsOptions
  children?: () => ReactElement
}

export class DisplayResults extends React.Component<DisplayResultsProps> {

  static defaultProps: Partial<DisplayResultsProps> = {
    displayResultsOptions: {
      withScore: true,
      drawLines: true
    }
  }

  displayResults({ input, overlay, results, displayResultsOptions }: DisplayResultsProps) {
    displayResults(input, overlay, results, displayResultsOptions)
  }

  componentWillReceiveProps(nextProps: DisplayResultsProps) {
    if (!shallowEquals(this.props, nextProps, ['children'])) {
      this.displayResults(nextProps)
    }
  }

  componentDidMount() {
    this.displayResults(this.props)
  }

  render(): any {
    const { children } = this.props
    return children ? children() : null
  }
}