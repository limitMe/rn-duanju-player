import DataPersistor from "./DataPersistor"
import { DuanjuSeriesType, DuanjuSeries, DuanjuEpisodeType, DuanjuEpisode } from "./Duanju"

class DuanjuManager {
  private allSeries: DuanjuSeriesType[]
  private currentSeriesIndex: number
  private currentEpisodeIndex: number

  private getRandomInt(max: number): number {
    let min: number = 0
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor(
    allSeries: DuanjuSeriesType[],
    lastSeriesFilePath: string,
    lastEpisodeFileName: string
  ) {
    this.allSeries = allSeries

    let currentEpisodeIndex: number | undefined = undefined
    let currentSeriesIndex: number | undefined = undefined 

    allSeries.forEach((series, index) => {
      if (series.fullpath === lastSeriesFilePath) {
        series.getEpisodes().forEach((episode, index) => {
          if (episode.filename === lastEpisodeFileName) {
            currentEpisodeIndex = index
            series.lastPlayedIndex = currentEpisodeIndex
          }
        })
        currentSeriesIndex = index
      }
    });

    if (currentSeriesIndex === undefined) {
      currentSeriesIndex = this.getRandomInt(allSeries.length - 1)
    }

    if (currentEpisodeIndex === undefined) {
      currentEpisodeIndex = this.getRandomInt(allSeries[currentSeriesIndex].getEpisodeCount() - 1)
    }

    this.currentSeriesIndex = currentSeriesIndex
    this.currentEpisodeIndex = currentEpisodeIndex
  }

  public previousEposideFullPath(): string {
    if (0 === this.currentEpisodeIndex) {
      return this.previousSeriesFullPath()
    }
    const series = this.allSeries[this.currentSeriesIndex]
    const episodes = series.getEpisodes()
    this.currentEpisodeIndex -= 1
    DataPersistor.sharedInstance().setLastEpisodeFileName(episodes[this.currentEpisodeIndex].filename)
    series.lastPlayedIndex = this.currentEpisodeIndex
    return `${series.fullpath}/${episodes[this.currentEpisodeIndex].filename}`
  }

  public nextEposideFullPath(): string {
    if (this.allSeries[this.currentSeriesIndex].getEpisodeCount() === this.currentEpisodeIndex + 1) {
      return this.nextSeriesFullPath()
    }
    const series = this.allSeries[this.currentSeriesIndex]
    const episodes = series.getEpisodes()
    this.currentEpisodeIndex += 1
    DataPersistor.sharedInstance().setLastEpisodeFileName(episodes[this.currentEpisodeIndex].filename)
    series.lastPlayedIndex = this.currentEpisodeIndex
    return `${series.fullpath}/${episodes[this.currentEpisodeIndex].filename}`
  }

  public previousSeriesFullPath(): string {
    if (this.currentSeriesIndex === 0) {
      this.currentSeriesIndex = this.allSeries.length - 1
    } else {
      this.currentSeriesIndex -= 1
    }

    const series = this.allSeries[this.currentSeriesIndex]
    const episodes = series.getEpisodes()
    const episode = episodes[series.lastPlayedIndex] ?? episodes[0]
    DataPersistor.sharedInstance().setLastSeriesFilePath(series.fullpath)
    return `${series.fullpath}/${episode.filename}`
  }

  public nextSeriesFullPath(): string {
    if (this.currentSeriesIndex === this.allSeries.length - 1) {
      this.currentSeriesIndex = 0
    } else {
      this.currentSeriesIndex += 1
    }

    const series = this.allSeries[this.currentSeriesIndex]
    const episodes = series.getEpisodes()
    const episode = episodes[series.lastPlayedIndex] ?? episodes[0]
    DataPersistor.sharedInstance().setLastSeriesFilePath(series.fullpath)
    return `${series.fullpath}/${episode.filename}`
  }

  public currentVideoFullPath(): string {
    const series = this.allSeries[this.currentSeriesIndex]
    const episodes = series.getEpisodes()
    const episode = episodes[series.lastPlayedIndex] ?? episodes[0]
    return `${series.fullpath}/${episode.filename}`
  }
}

export default DuanjuManager;