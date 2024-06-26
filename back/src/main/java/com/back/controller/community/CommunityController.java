package com.back.controller.community;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.CommunityDTO;
import com.back.service.community.CommunityService;
import com.back.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping(value = "/community")

public class CommunityController {
    private final CommunityService communityService;
    private final CustomFileUtil fileUtil;

    // 게시글 등록
    @PostMapping("/register")
    public Map<String, Long> regCommunity(CommunityDTO communityDTO) {
        List<MultipartFile> files = communityDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        communityDTO.setUploadFileNames(uploadFileNames);

        Long communityBno = communityService.regCommunity(communityDTO);

        try { // front의 fetching 진행모달창 1초동안 보이기
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Map.of("result", communityBno);
    }

    // 게시글 상세보기
    @GetMapping("/read/{communityBno}")
    public CommunityDTO getCommunity(@PathVariable(name = "communityBno") Long communityBno) {
        return communityService.getCommunity(communityBno);
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    // 게시믈 리스트
    @GetMapping("/list")
    public PageResponseDTO<CommunityDTO> getCommunityList(PageRequestDTO pageRequestDTO) {

        return communityService.getCommunityList(pageRequestDTO);
    }

    // 마이페이지에서 내 글 보기
    @GetMapping("/myList")
    public PageResponseDTO<CommunityDTO> getMyList(PageRequestDTO pageRequestDTO,
            @RequestParam(name = "email") String email) {
        return communityService.getMyList(pageRequestDTO, email);
    }

    @PutMapping("/{communityBno}")
    public Map<String, String> modCommunity(@PathVariable(name = "communityBno") Long communityBno,
            CommunityDTO communityDTO) {
        communityDTO.setCommunityBno(communityBno);
        CommunityDTO oldCommunityDTO = communityService.getCommunity(communityBno);
        // 기존의 파일들 (데이터베이스에 존재하는 파일들 - 수정 과정에서 삭제되었을 수 있음)
        List<String> oldFileNames = oldCommunityDTO.getUploadFileNames();
        // 새로 업로드 해야 하는 파일들
        List<MultipartFile> files = communityDTO.getFiles();
        // 새로 업로드되어서 만들어진 파일 이름들
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        // 화면에서 변화 없이 계속 유지된 파일들
        List<String> uploadedFileNames = communityDTO.getUploadFileNames();

        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야 하는 파일 목록이 됨
        if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }
        communityService.modCommunity(communityDTO);

        if (oldFileNames != null && oldFileNames.size() > 0) {
            // 지워야 하는 파일 목록 찾기
            // 예전 파일들 중에서 지워져야 하는 파일이름들
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            // 실제 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");

    }

    // 게시글 삭제
    @DeleteMapping("/{communityBno}")
    public Map<String, String> delCommunity(@PathVariable(name = "communityBno") Long communityBno) {

        // 삭제해야할 파일들 알아내기
        List<String> oldFileNames = communityService.getCommunity(communityBno).getUploadFileNames();
        communityService.delCommunity(communityBno);
        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT", "SUCCESS");
    }

}
