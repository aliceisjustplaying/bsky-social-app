import {
  openCamera as openCameraFn,
  openCropper as openCropperFn,
  Image as RNImage,
} from 'react-native-image-crop-picker'
import {RootStoreModel} from 'state/index'
import {CameraOpts, CropperOptions} from './types'
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker'
import {getDataUriSize} from './util'

/**
 * NOTE
 * These methods all include the RootStoreModel as the first param
 * because the web versions require it. The signatures have to remain
 * equivalent between the different forms, but the store param is not
 * used here.
 * -prf
 */

export async function openPicker(
  _store: RootStoreModel,
  opts?: Partial<ImageLibraryOptions>,
): Promise<RNImage[]> {
  const images: RNImage[] = []

  const response = await launchImageLibrary({
    ...opts,
    mediaType: 'photo',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.9,
  })

  if (response.didCancel) {
    _store.log.error('Unable to pick images: Cancelled')
  }

  if (response.errorCode) {
    _store.log.error(
      `Unable to pick images: ${
        response.errorMessage !== undefined ? ':' + response.errorMessage : ''
      }`,
    )
  }

  if (response.assets === undefined) {
    _store.log.error('Unable to pick images: images undefined')
  }

  if (response.assets !== undefined) {
    for (let i = 0; i < response.assets.length; i++) {
      const image = response.assets[i]

      if (
        image.height === undefined ||
        image.width === undefined ||
        image.uri === undefined
      ) {
        _store.log.error('Unable to pick images: undefined attribute')
      } else {
        images.push({
          mime: 'image/jpeg',
          height: image.height,
          width: image.width,
          path: image.uri,
          size: getDataUriSize(image.uri),
        })
      }
    }
  }

  return images
}

export async function openCamera(
  _store: RootStoreModel,
  opts: CameraOpts,
): Promise<RNImage> {
  const item = await openCameraFn({
    width: opts.width,
    height: opts.height,
    freeStyleCropEnabled: opts.freeStyleCropEnabled,
    cropperCircleOverlay: opts.cropperCircleOverlay,
    cropping: false,
    forceJpg: true, // ios only
    compressImageQuality: 0.8,
  })
  return {
    path: item.path,
    mime: item.mime,
    size: item.size,
    width: item.width,
    height: item.height,
  }
}

export async function openCropper(
  _store: RootStoreModel,
  opts: CropperOptions,
): Promise<RNImage> {
  const item = await openCropperFn({
    height: 2000,
    width: 2000,
    ...opts,
    forceJpg: true, // ios only
    compressImageQuality: 0.8,
  })

  console.log('BTW ITEM: ', item)

  return {
    path: item.path,
    mime: item.mime,
    size: item.size,
    width: item.width,
    height: item.height,
  }
}
