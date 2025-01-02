interface DuanjuSeriesType {
  fullpath: string
  lastPlayedIndex: number
  
  addEpisode(episode: DuanjuEpisodeType): void
  getEpisodes(): DuanjuEpisodeType[]
  getEpisodeCount(): number
  sortEpisodes(): void
}

interface DuanjuEpisodeType {
  filename: string
}

class DuanjuSeries implements DuanjuSeriesType {
  public fullpath: string
  public lastPlayedIndex: number = 0
  private episodes: DuanjuEpisodeType[] = []

  constructor(
    fullpath: string
  ){
    this.fullpath = fullpath
  }

  public addEpisode(episode: DuanjuEpisodeType): void {
    this.episodes.push(episode)
  }

  public getEpisodes(): DuanjuEpisodeType[] {
    return [...this.episodes]
  }

  public getEpisodeCount(): number {
    return this.episodes.length
  }

  public sortEpisodes(): void {
    this.episodes.sort((a, b) => {
      const aBaseName = a.filename.split('.').slice(0, -1).join('.'); // 去掉扩展名
      const bBaseName = b.filename.split('.').slice(0, -1).join('.'); // 去掉扩展名

      const isANumber = !isNaN(Number(aBaseName));
      const isBNumber = !isNaN(Number(bBaseName));

      // 如果 a 是数字，b 不是数字，a 排在前
      if (isANumber && !isBNumber) return -1;
      // 如果 b 是数字，a 不是数字，b 排在前
      if (!isANumber && isBNumber) return 1;

      // 如果都是数字，按数值大小排序
      if (isANumber && isBNumber) {
        return Number(aBaseName) - Number(bBaseName);
      }

      // 如果都是非数字，按字典顺序排序
      return aBaseName.localeCompare(bBaseName);
    });
  }
}

class DuanjuEpisode implements DuanjuEpisodeType {
  public filename: string

  constructor(filename: string){
    this.filename = filename
  }
}

export type { DuanjuSeriesType, DuanjuEpisodeType }
export { DuanjuSeries, DuanjuEpisode }
